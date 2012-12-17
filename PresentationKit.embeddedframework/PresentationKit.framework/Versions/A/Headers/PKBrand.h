#import <CoreData/CoreData.h>
@class PKRepresentative;
@class PKHealthCareProvider;
@class PKPresentation;

@interface PKBrand : NSManagedObject

@property (nonatomic, assign) NSInteger idFromCMS;
@property (nonatomic, retain) NSString* summary;
@property (nonatomic, retain) NSString* thumbnail;
@property (nonatomic, retain) NSString* title;
@property (nonatomic, retain) NSSet* healthCareProviders;
@property (nonatomic, retain) NSSet* presentations;
@property (nonatomic, retain) NSSet* representatives;

@end

@interface PKBrand (CoreDataGeneratedAccessors)

- (void) addHealthCareProvidersObject:(PKHealthCareProvider*)value;
- (void) removeHealthCareProvidersObject:(PKHealthCareProvider*)value;
- (void) addHealthCareProviders:(NSSet*)healthCareProviders;
- (void) removeHealthCareProviders:(NSSet*)healthCareProviders;

- (void) addPresentationsObject:(PKPresentation*)value;
- (void) removePresentationsObject:(PKPresentation*)value;
- (void) addPresentations:(NSSet*)values;
- (void) removePresentations:(NSSet*)values;

- (void) addRepresentativesObject:(PKRepresentative*)value;
- (void) removeRepresentativesObject:(PKRepresentative*)value;
- (void) addRepresentatives:(NSSet*)values;
- (void) removeRepresentatives:(NSSet*)values;

@end


@interface NSManagedObjectContext (PKBrand)

- (PKBrand*) findBrandWithIdFromCMS:(NSInteger)idFromCMS;
- (PKBrand*) findBrandWithIdFromCMS:(NSInteger)idFromCMS orInsert:(void(^)(PKBrand* brand))didInsert;

@end