'use client';

import '@livelike/engagementsdk';
import LiveLike from '@livelike/engagementsdk';

const html = (window as any).html;

class CustomWidgets extends (window as any).LiveLikeWidgets {

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
      super.connectedCallback?.();
  }

  onWidgetReceived(widgetPayload: any) {
    if (LiveLike.getLanguage() !== 'en') {
        switch (widgetPayload?.kind) {
            case 'text-poll':
            case 'text-prediction':
                widgetPayload.question = widgetPayload.localized_data[LiveLike.getLanguage()]?.question || widgetPayload.question;
                widgetPayload.options.forEach((option: any) => {
                    option.description = option.localized_data[LiveLike.getLanguage()]?.description || option.description;
                })
                break;
            case 'text-quiz':
                widgetPayload.question = widgetPayload.localized_data[LiveLike.getLanguage()]?.question || widgetPayload.question;
                widgetPayload.choices.forEach((choice: any) => {
                    choice.description = choice.localized_data[LiveLike.getLanguage()]?.description || choice.description;
                })
                break;
            case 'emoji-slider':
                widgetPayload.question = widgetPayload.localized_data[LiveLike.getLanguage()]?.question || widgetPayload.question;
                break;
            case 'alert':
                widgetPayload.text = widgetPayload.localized_data[LiveLike.getLanguage()]?.text || widgetPayload.text;
                widgetPayload.title = widgetPayload.localized_data[LiveLike.getLanguage()]?.title || widgetPayload.title;
                break;
            default:
                break;
        }
    }
    
    return widgetPayload;
  }
}

if (typeof window !== 'undefined') {
  window.customElements.define('custom-widgets', CustomWidgets as any);
}

export default CustomWidgets;

