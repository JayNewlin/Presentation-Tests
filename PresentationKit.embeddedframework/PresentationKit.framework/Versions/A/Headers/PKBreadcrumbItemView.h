@class PKSlide;

extern CGSize const kActiveCallSize;
extern CGSize const kDivergentSize;
extern CGFloat const kCornerRadius;

@interface PKBreadcrumbItemView : UIView

@property (nonatomic, strong) PKSlide* slide;
@property (nonatomic, strong) PKBreadcrumbItemView* leftNeighbor;
@property (nonatomic, strong) PKBreadcrumbItemView* rightNeighbor;
@property (nonatomic, strong) PKBreadcrumbItemView* topNeighbor;
@property (nonatomic, strong) PKBreadcrumbItemView* bottomNeighbor;

@property (nonatomic) int horizontalIndex;
@property (nonatomic) int verticalIndex;

@property (nonatomic) BOOL isSelected;
@property (nonatomic) BOOL isActiveCall;
@property (strong, nonatomic) UIColor* defaultColor;
@property (strong, nonatomic) UIColor* activeColor;
@property (strong, nonatomic) UIColor* selectedColor;

-(id)initWithFrame:(CGRect)frame andSlide:(PKSlide*)slide;
@end
