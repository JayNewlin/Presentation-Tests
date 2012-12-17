#import <PresentationKit/PKPresentationViewController+Private.h>

@class PKNavigationView;
@class PKPresentationContentScrollView;
@class PKCallBuilder;
@class PKBreadcrumbItemView;

@interface PKPresentationViewController ()
@property (nonatomic, weak, readonly) IBOutlet PKNavigationView* navigationView;
@property (nonatomic, strong, readonly) PKPresentationContentScrollView* contentScroller;

@property (nonatomic, strong) PKBreadcrumbItemView* currentItem;
@property (nonatomic, assign) BOOL thumbMapActive;
@property (nonatomic, assign) BOOL briefcaseActive;
@end
