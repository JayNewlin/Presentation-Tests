@class PKPresentation;
@interface PKSection : NSManagedObject

@property (nonatomic, strong) PKPresentation* presentation;
@property (nonatomic, strong) NSString* name;
@property (nonatomic, strong) NSArray* slides;

@end
