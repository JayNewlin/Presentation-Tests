
typedef enum {
    kEventTypePDF,
    kEventTypePDFPage,
    kEventTypePDFBookmark,
    kEventTypeSlide,
    kEventTypeVideo,
    kEventTypeVideoPlay,
    kEventTypeVideoPause,
    kEventTypeVideoStop,
    kEventTypeVideoSeek,
    kEventTypePopup,
    kEventTypeBriefcase,
    kEventTypeMap,
    kEventTypeHTML,
    kEventTypePausePresentation,
    kEventTypeDraw,
    kEventTypeScreenLock,
    kEventTypeSurvey,
    kEventTypeOrientationChange,
	kEventTypeCustom,
	kEventTypeSampleSignature,
} EventType;

@class PKCall;
@class PKHealthCareProvider;
@class PKSlide;
@class NSManagedObjectObservable;

@interface PKEvent : NSManagedObject

@property (nonatomic) EventType type;

@property (strong, nonatomic) NSString* notes;
@property (strong, nonatomic) NSString* brandName;
@property (strong, nonatomic) NSString* title;
@property (strong, nonatomic) NSString* contentKey;
@property (strong, nonatomic) NSString* data;
@property (strong, nonatomic) NSString* parentID;

@property (strong, nonatomic) NSDate* startTime;
@property (strong, nonatomic) NSDate* endTime;
@property (nonatomic) BOOL flag;
@property (nonatomic, strong) NSOrderedSet* ratings;
@property (strong, nonatomic) PKCall* call;
@property (strong, nonatomic) PKSlide* slide;

@property (readonly, nonatomic) UIImage* thumbnailImage;

- (NSArray*) healthCareProviders;
- (void) removeHealthCareProvider:(PKHealthCareProvider*)healthCareProvider;
- (void) addHealthCareProviders:(NSOrderedSet*)hcpToAdd;

@end


@interface NSManagedObjectContext (Event)

- (NSArray*) eventsWithPredicate:(NSPredicate*)predicate error:(NSError**)error;
- (NSUInteger) numberOfEventsWithPredicate:(NSPredicate*)predicate error:(NSError**)error;
- (NSManagedObjectObservable*) eventsObservable;

@end
