'use client';

import { useCallback, useEffect, useRef } from 'react';

import type LiveLikeSDK from '@livelike/engagementsdk';

import type { ReactionItem } from './reactionBatchLoader.types';
import {
  BATCH_SIZE,
  chunkArray,
  clearPendingOnError,
  filterNewItems,
  groupByReactionSpace,
  markItemsAsFetched,
  markItemsAsPending,
} from './reactionBatchLoader.utils';

export const useLoadReactions = (
  items: ReactionItem[],
  isLiveLikeInitialized: boolean,
  onTargetGroupIdLoaded: (
    reactionSpaceId: string,
    targetGroupId: string
  ) => void
) => {
  const fetchedRef = useRef<Map<string, Set<string>>>(new Map());
  const initializedSpacesRef = useRef<Set<string>>(new Set());
  const pendingLoadsRef = useRef<Set<string>>(new Set());

  const loadReactionsForSpace = useCallback(
    async (
      sdk: typeof LiveLikeSDK,
      reactionSpaceId: string,
      targetIds: string[]
    ): Promise<void> => {
      try {
        if (!initializedSpacesRef.current.has(reactionSpaceId)) {
          const reactionSpace = await sdk.getReactionSpaceDetail({
            reactionSpaceId,
          });

          onTargetGroupIdLoaded(reactionSpaceId, reactionSpace.target_group_id);

          await sdk.reactionPackController.loadReactionPackFromReactionSpace(
            reactionSpace
          );
          initializedSpacesRef.current.add(reactionSpaceId);
        }

        const batches = chunkArray(targetIds, BATCH_SIZE);
        for (const batch of batches) {
          await sdk.userReactionController.loadUserReactions({
            reactionSpaceId,
            targetIds: batch,
          });
        }

        markItemsAsFetched(
          reactionSpaceId,
          targetIds,
          fetchedRef.current,
          pendingLoadsRef.current
        );
      } catch (error) {
        console.error('[ReactionBatchLoader] Error loading reactions:', error);
        clearPendingOnError(
          reactionSpaceId,
          targetIds,
          pendingLoadsRef.current
        );
      }
    },
    [onTargetGroupIdLoaded]
  );

  useEffect(() => {
    if (!isLiveLikeInitialized) return;

    const loadReactions = async () => {
      const LiveLike = (await import('@livelike/engagementsdk')).default;

      if (!LiveLike.userProfile?.id) return;

      const newItems = filterNewItems(
        items,
        fetchedRef.current,
        pendingLoadsRef.current
      );

      if (newItems.length === 0) return;

      markItemsAsPending(newItems, pendingLoadsRef.current);

      const grouped = groupByReactionSpace(newItems);

      for (const [reactionSpaceId, targetIds] of Object.entries(grouped)) {
        await loadReactionsForSpace(LiveLike, reactionSpaceId, targetIds);
      }
    };

    void loadReactions();
  }, [items, isLiveLikeInitialized, loadReactionsForSpace]);
};