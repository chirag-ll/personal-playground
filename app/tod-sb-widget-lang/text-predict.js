class CustomTextPrediction extends window.LiveLikePrediction {
  isClicked = false;
  selectedOptionIndex = null;
  remainingDuration = 0;
  _expiryTimerId = null;
  _endTime = null;
  _startTime = null;

  _parseISODurationToMs(iso) {
    if (!iso) return null;
    const m = iso.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
    if (!m) return null;
    const days = parseInt(m[1] || "0", 10);
    const hrs  = parseInt(m[2] || "0", 10);
    const mins = parseInt(m[3] || "0", 10);
    const secs = parseInt(m[4] || "0", 10);
    return (((days * 24 + hrs) * 60 + mins) * 60 + secs) * 1000;
  }

  onClickOption(index) {
    if (!this.isClicked && !this.disabled && !this.interaction && !this.isExpired) {
      this.isClicked = true;
      this.selectedOptionIndex = index;
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._initTimer();
  }

  firstUpdated() {
    this.updateComplete?.then(() => {
      if (this.interaction) {
        this.isClicked = true;
        const selectedOption = this.options.find(o => o.id === this.interaction.option_id);
        if (selectedOption) {
          this.selectedOptionIndex = this.options.indexOf(selectedOption);
        }
      }
    });
  }

  _initTimer() {
    const payload = this.widgetPayload || {};
    const interactiveUntilStr = payload.interactive_until;
    const publishedAtStr = payload.published_at;
    const timeoutIso = payload.timeout;

    const now = Date.now();
    const publishedAt = publishedAtStr ? new Date(publishedAtStr).getTime() : null;
    const interactiveUntil = interactiveUntilStr ? new Date(interactiveUntilStr).getTime() : null;
    const timeoutMs = this._parseISODurationToMs(timeoutIso);

    this._startTime = publishedAt || now;

    if (this._endTime == null) {
      let endTime = null;

      if (!isNaN(interactiveUntil)) {
        endTime = interactiveUntil;
      } else if (timeoutMs && publishedAt) {
        endTime = publishedAt + timeoutMs;
      } else if (timeoutMs) {
        endTime = now + timeoutMs;
      }

      this._endTime = endTime;
    }

    this._applyTimerFromNow();
  }

  _applyTimerFromNow() {
    const now = Date.now();

    if (!this._endTime || this._endTime <= now) {
      this.remainingDuration = 0;
      this.isExpired = !!this._endTime && this._endTime <= now;
      this.transitionStyle = `width: 0%;`;

      if (this._expiryTimerId) {
        clearTimeout(this._expiryTimerId);
        this._expiryTimerId = null;
      }

      this.requestUpdate();
      return;
    }

    const totalMs = this._endTime - (this._startTime || now);
    const remainingMs = this._endTime - now;

    this.remainingDuration = remainingMs;
    this.isExpired = false;

    const initialWidthPct = Math.max(
      0,
      Math.min(100, (remainingMs / totalMs) * 100)
    );

    this.transitionStyle = `
      width: ${initialWidthPct}%;
      animation: shrinkTimer ${remainingMs}ms linear forwards;
    `;

    if (this._expiryTimerId) {
      clearTimeout(this._expiryTimerId);
      this._expiryTimerId = null;
    }

    this._expiryTimerId = setTimeout(() => {
      this.isExpired = true;
      this.remainingDuration = 0;
      this.requestUpdate();
    }, remainingMs);

    this.requestUpdate();
  }

  refreshTimer() {
    this._applyTimerFromNow();
  }

  disconnectedCallback() {
    if (this._expiryTimerId) {
      clearTimeout(this._expiryTimerId);
      this._expiryTimerId = null;
    }
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  getTotalVotes() {
    return this.options.reduce((a, b) => a + b.vote_count, 0);
  };

  getNormalizedPercentages() {
    const total = this.getTotalVotes();
    if (!total) return this.options.map(() => 0);

    const raw = this.options.map(o => (o.vote_count / total) * 100);
    const ints = raw.map(Math.floor);
    let leftover = 100 - ints.reduce((a, b) => a + b, 0);

    const order = raw
      .map((val, i) => ({ i, frac: val - ints[i] }))
      .sort((a, b) => b.frac - a.frac);

    for (let k = 0; k < order.length && leftover > 0; k += 1) {
      ints[order[k].i] += 1;
      leftover -= 1;
    }

    return ints;
  }

  render() {
    const percentages = this.getNormalizedPercentages();
    const isVoted = !!this.interaction || this.isClicked;
    const isDisabled = this.disabled || this.isExpired || isVoted;

    return window.html`
      <template>
        <livelike-widget-root class="custom-widget livelike-widget-root">
          <div class="livelike-widget-header">
            ${this.remainingDuration > 0
              ? window.html`<div class="livelike-timer-bar" style="${this.transitionStyle}"></div>`
              : null
            }
            <p class="livelike-widget-type">${this.localTranslations.textPrediction}</p>
            <p class="livelike-widget-question">${this.widgetPayload?.question}</p>
          </div>
          <div class="livelike-widget-body">
            <div class="livelike-text-prediction">
              <div class="livelike-text-prediction-select">
                ${this.options.map((option, idx) => {
                  const percentage = percentages[idx] ?? 0;
                  const isSelected = (this.interaction && this.interaction.option_id === option.id) ||
                                     (this.isClicked && this.selectedOptionIndex === idx);

                  return window.html`
                    <livelike-option
                      ?disabled=${isDisabled}
                      ?selected=${isSelected}
                      class="livelike-text-prediction-option high-space"
                      index="${idx}"
                      @click=${() => this.onClickOption(idx)}
                    >
                      <div class="prediction-option-content">
                        <div class="prediction-option-info">
                          <p class="prediction-option-description">${option.description}</p>
                          ${isVoted ? window.html `
                             <div class="prediction-option-bar" style="width: ${percentage}%"></div>
                            ` : null}
                        </div>
                          ${isVoted ? window.html `
                             <p class="prediction-option-percentage">${percentage}%</p>
                            ` : null}
                      </div>
                    </livelike-option>
                  `;
                })}
              </div>
              ${this.widgetPayload.confirmation_message && isVoted
                ? window.html`<p class="livelike-confirmation-message">${this.widgetPayload.confirmation_message}</p>`
                : this.isExpired && !isVoted
                ? window.html`<p class="livelike-text-prediction-expired">${this.localTranslations.expired}</p>`
                : null
              }
            </div>
          </div>
        </livelike-widget-root>
      </template>
    `;
  }
}

customElements.define("custom-text-prediction", CustomTextPrediction);