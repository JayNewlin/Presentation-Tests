#import <UIKit/UIKit.h>

typedef enum {
    kDeploymentModeProduction,
    kDeploymentModePreview,
    kDeploymentModeTraining,
} DeploymentMode;

@class PKPresentationViewController;
@class PKCallBuilder;


@protocol PKPresentationViewControllerDelegate <NSObject>

@required
- (void) presentationViewController:(PKPresentationViewController*)controller didPressExitButton:(UIButton*)exitButton;

@optional
- (void) presentationViewControllerDidPressSignButton:(PKPresentationViewController*)controller;
- (void) presentationViewController:(PKPresentationViewController*)controller userDidSelfCertifyForPresentation:(PKPresentation*)presentation;
- (NSURL*) presentationViewController:(PKPresentationViewController*)controller willLoadContentFromURL:(NSURL*)url;
- (void) presentationViewController:(PKPresentationViewController *)controller prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender;

@end


@interface PKPresentationViewController : UIViewController

@property (nonatomic, weak) id <PKPresentationViewControllerDelegate> delegate;

@property (nonatomic, strong) PKFlow* flow;
@property (nonatomic, strong) NSArray* allPresentations;

@property (nonatomic, strong) PKCallBuilder* callBuilder;
@property (nonatomic) DeploymentMode deploymentMode;
@property (nonatomic, strong) PKRepresentative* representative;

- (void) restartActiveCall;

- (void) _resetPresentation;
- (void) _setUpPresentationEnvironment;
- (void) _startPresentation;

@end