
@class PKRepresentative;

@interface PKCall : NSManagedObject

@property (nonatomic, strong) NSDate* startTime;
@property (nonatomic, strong) NSDate* endTime;
@property (nonatomic, strong) NSOrderedSet* events;
@property (nonatomic, getter = isCompleted) BOOL completed;
@property (nonatomic, strong) NSOrderedSet* presentations;
@property (nonatomic, strong) PKRepresentative* representative;

- (NSOrderedSet*) audience;

@end

@interface NSManagedObjectContext (PKCall)

- (NSManagedObjectObservable*) unfinishedCallsObservable;

@end
