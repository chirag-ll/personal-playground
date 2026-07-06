import UIKit
import EngagementSDK
import LiveLikeSwift

class PopupCustomStateDelegate: UIViewController {

    var engagementSDK: EngagementSDK!
    let widgetViewController = WidgetPopupViewController()
    var session: ContentSession?

    override func viewDidLoad() {
        super.viewDidLoad()

        var config = EngagementSDKConfig(clientID: "_CLIENT_ID_")
        config.accessTokenStorage = CTokenStorage()

        engagementSDK = EngagementSDK(config: config)

        addChild(widgetViewController)
        self.view.addSubview(widgetViewController.view)
        widgetViewController.didMove(toParent: self)

        widgetViewController.view.translatesAutoresizingMaskIntoConstraints = false
        widgetViewController.widgetStateController = CustomStateController(
            closeButtonAction: { [weak self] in
                self?.widgetViewController.dismissWidget(direction: .up, dismissAction: .tapX)
            },
            widgetFinishedCompletion: { [weak self] widget in
                guard let self else { return }
                guard widget.id == self.widgetViewController.currentWidget?.id else { return }
                self.widgetViewController.dismissWidget(direction: .up, dismissAction: .complete)
            }
        )
        NSLayoutConstraint.activate([
            widgetViewController.view.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor),
            widgetViewController.view.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
            widgetViewController.view.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
            widgetViewController.view.leadingAnchor.constraint(equalTo: self.view.leadingAnchor)
        ])

        //Creating a Content Session
        let sessionConfig = SessionConfiguration(programID: "_PROGRAM_ID_")
        session = engagementSDK.contentSession(config: sessionConfig)

       // Applying the Content Session to the Widget and Chat ViewControllers
        widgetViewController.session = session
    }

    //Ending a session
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        self.session?.close()
    }
}

public class CustomStateController {
    private let closeButtonAction: () -> Void
    private let widgetFinishedCompletion: (WidgetViewModel) -> Void

    public init(
        closeButtonAction: @escaping () -> Void,
        widgetFinishedCompletion: @escaping (WidgetViewModel) -> Void
    ) {
        self.closeButtonAction = closeButtonAction
        self.widgetFinishedCompletion = widgetFinishedCompletion
    }
}

extension CustomStateController: WidgetViewDelegate {
    public func widgetDidEnterState(widget: WidgetViewModel, state: WidgetState) {
        switch state {
        case .ready:
            break
        case .interacting:
            weak var weakWidget = widget
            widget.addTimer(seconds: widget.interactionTimeInterval ?? 5) { _ in
                weakWidget?.moveToNextState()
            }
        case .results:
            widget.addCloseButton { [weak self] _ in
                self?.closeButtonAction()
            }
        case .finished:
            // If the user did not interact with the widget then dismiss immediately
            // Otherwise dismiss the widget after a few seconds
            if !widget.userDidInteract, widget.kind != .alert {
                self.widgetFinishedCompletion(widget)
            } else {
                DispatchQueue.main.asyncAfter(deadline: .now() + 6) { [weak self] in
                    self?.widgetFinishedCompletion(widget)
                }
            }
        }
    }

    public func widgetStateCanComplete(widget: WidgetViewModel, state: WidgetState) {
        switch state {
        case .ready:
            break
        case .interacting:
            if widget.kind.isOf(.textQuiz, .imageQuiz, .imageSlider) {
                widget.cancelTimer()
                widget.moveToNextState()
            }
        case .results:
            if widget.kind.isOf(
                .imagePredictionFollowUp,
                .textPredictionFollowUp,
                .imageNumberPredictionFollowUp
            ) {
                weak var weakWidget = widget
                widget.addTimer(seconds: widget.interactionTimeInterval ?? 5) { _ in
                    weakWidget?.moveToNextState()
                }
            } else {
                widget.moveToNextState()
            }
        case .finished:
            break
        }
    }

    public func userDidInteract(_ widget: WidgetViewModel) {
        print("Interacted: \(widget.kind) - \(widget.widgetTitle)")
    }

    public func userDidSubmitVote(_ widget: WidgetViewModel, selectedVote: ChoiceWidgetVote) {
        print("Selection: \(widget.kind) - \(widget.widgetTitle) - \(selectedVote.text) \(selectedVote.id)")
    }
}

extension WidgetKind {
    /// Checks whether the WidgetKind is contained in elements
    func isOf(_ elements: WidgetKind...) -> Bool {
        return elements.contains(self)
    }
}