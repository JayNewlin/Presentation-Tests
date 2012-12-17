@class PKPresentation;

typedef enum {
    modalTypePdf,
    modalTypePopup,
    modalTypeVideo,
} ModalType;

@interface PKSlideModal : NSManagedObject

@property (strong, nonatomic) NSString* title;
@property (strong, nonatomic) NSString* brand;
@property (strong, nonatomic) NSString* path;
@property (strong, nonatomic) NSString* sectionTitle;
@property (strong, nonatomic) PKPresentation* presentation;
@property (nonatomic) ModalType modalType;
@property (strong, nonatomic) NSURL* thumbnailImageLocation;
@property (strong, nonatomic) NSString* assetID;
@property (strong, nonatomic) NSSet* dependentAssets;
@property (strong, nonatomic) NSString* status;
@property (strong, nonatomic) NSString* message;
@property (strong, nonatomic) NSString* menuVisibility;

@property (strong, nonatomic) UIImage* thumbnailImage;

@end
