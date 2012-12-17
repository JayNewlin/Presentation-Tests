
@interface NSManagedObjectObservable : NSObject

@property (nonatomic, strong, readonly) NSArray* contents;

- (id) initWithManagedObjectContext:(NSManagedObjectContext*)context fetchRequest:(NSFetchRequest*)request;

- (void) setPredicate:(NSPredicate*)predicate;

@end

extern NSString* const NSManagedObjectObservableObservationKey;
