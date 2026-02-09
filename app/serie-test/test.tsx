
// import { LiveLikeQuiz } from "@livelike/engagementsdk";
import "./quiz.css";
// import { handleInvokeReward } from "../../utils/handleInvokeReward";
const html = (window as any).html;

class LGTextQuiz extends window.LiveLikeQuiz {
  @((window as any).property({ type: Object })) optionSelectedByUser: Record<
    string,
    string
  > = {};

  @((window as any).property({ type: Boolean })) isExpired = false;

  connectedCallback() {
    super.connectedCallback();
    const interactiveUntil: string = this.widgetPayload?.interactive_until;
    this.isExpired = interactiveUntil
      ? Date.now() > new Date(interactiveUntil).getTime()
      : false;
  }

  lockInVote = () => {
    if (!this.voteDisable && this.selectedOption?.id) {
      this.updateAnswerCount(this.selectedOption);
      this.voteDisable = true;

      this.optionSelectedByUser = this.selectedOption;
      this.createVote(this.selectedOption.answer_url).then(() => {
        this.quizVoteSubmitted = true;
        this.disabled = true;
      });
    //   handleInvokeReward();
    }
  };
  render() {
    const userSelection = this.interaction || this.optionSelectedByUser;
    const isUserCorrect = userSelection.is_correct ?? false;

    const renderOptions = () =>
      html`
        <livelike-select>
          <template>
            <livelike-option>
              <div class="options-container">
                <livelike-progress></livelike-progress>
                <livelike-description></livelike-description>
                <livelike-percentage></livelike-percentage>
              </div>
            </livelike-option>
          </template>
        </livelike-select>
      `;

    const renderSubmitBtnText = () => {
      if (this.isExpired) {
        if (this.interaction) return "Expired";
        else return "Expired";
      } else if (userSelection.id) {
        if (isUserCorrect) return "Correct!";
        else return "Incorrect!";
      } else {
        return "Submit";
      }
    };

    const renderFooter = () =>
      html`
        <livelike-footer>
          <button
            class=${`vote-button ${
              userSelection.id ? "interacted" : this.isExpired ? "expired" : ""
            }`}
            @click=${this.lockInVote}
            ?disabled=${!this.selectedOption ||
            !this.selectedOption.id ||
            this.quizVoteSubmitted ||
            this.voteDisable ||
            this.disabled}
          >
            ${renderSubmitBtnText()}
          </button>
        </livelike-footer>
      `;
    return html`
      <template kind="text-quiz">
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            ${renderOptions()} ${renderFooter()}
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}

customElements.define("lg-text-quiz", LGTextQuiz as any);