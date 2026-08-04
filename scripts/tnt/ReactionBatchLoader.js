'use client';

import React, { type FC, useCallback, useState } from 'react';

import { useLiveLike } from '../provider/context';
import { ReactionContext } from './ReactionContext';
import type { ReactionBatchLoaderProps } from './reactionBatchLoader.types';
import { useLoadReactions } from './useLoadReactions';

export const ReactionBatchLoader: FC<ReactionBatchLoaderProps> = ({
  children,
  items,
}) => {
  const { isLiveLikeInitialized } = useLiveLike();
  const [targetGroupIdMap, setTargetGroupIdMap] = useState<
    Record<string, string>
  >({});

  const handleTargetGroupIdLoaded = useCallback(
    (reactionSpaceId: string, targetGroupId: string) => {
      setTargetGroupIdMap((prev) => ({
        ...prev,
        [reactionSpaceId]: targetGroupId,
      }));
    },
    []
  );

  useLoadReactions(items, isLiveLikeInitialized, handleTargetGroupIdLoaded);

  return (
    <ReactionContext.Provider value={{ targetGroupIdMap }}>
      {children}
    </ReactionContext.Provider>
  );
};




"