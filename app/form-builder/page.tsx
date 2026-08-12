'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import 'survey-core/survey-core.css';
import 'survey-creator-core/survey-creator-core.css';

export default function FormBuilderPage() {
  const [creator, setCreator] = useState<SurveyCreator | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const model = new SurveyCreator({
      showSidebar: true,
      showLogicTab: true,
      showTranslationTab: true,
      isAutoSave: true,
      showJSONEditorTab: true,
      showPageTitles: true,
      hasScroll: true,
      designerWidth: '100%',
    });

    model.JSON = {
      logoPosition: 'right',
      pages: [
        {
          name: 'page1',
          elements: [
            {
              type: 'text',
              name: 'welcome_title',
              title: 'Welcome to the Bundesliga fan form',
              isRequired: false,
            },
            {
              type: 'text',
              name: 'headline',
              title: 'Tell us what matters most to you this matchday.',
              inputType: 'text',
            },
            {
              type: 'image',
              name: 'banner_image',
              imageLink: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80',
              imageFit: 'contain',
            },
            {
              type: 'radiogroup',
              name: 'favorite_team',
              title: 'Which team are you supporting?',
              choices: ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Leverkusen', 'Other'],
            },
          ],
        },
      ],
    };

    setCreator(model);

    return () => {
      model.dispose();
    };
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>SurveyJS</div>
          <h1 style={styles.title}>Form Builder</h1>
        </div>
      </div>

      <div style={styles.editorWrap}>
        {creator ? <SurveyCreatorComponent creator={creator} /> : <div style={styles.loading}>Loading form designer…</div>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f3f6fb',
    color: '#101828',
    fontFamily: 'Arial, sans-serif',
    padding: 24,
  } as CSSProperties,
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  } as CSSProperties,
  eyebrow: {
    color: '#475467',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  title: {
    margin: '6px 0 0',
    fontSize: 34,
    fontWeight: 800,
  } as CSSProperties,
  editorWrap: {
    background: '#fff',
    borderRadius: 18,
    border: '1px solid #dfe3eb',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.06)',
    overflow: 'hidden',
    minHeight: 720,
  } as CSSProperties,
  loading: {
    display: 'grid',
    placeItems: 'center',
    minHeight: 300,
    color: '#344054',
    fontWeight: 600,
  } as CSSProperties,
};
