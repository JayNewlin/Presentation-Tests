#import <PresentationKit/PKBriefcaseRecipient.h>

@class PKBrand;

@interface PKHealthCareProvider : PKBriefcaseRecipient

@property (nonatomic, retain) NSString* address1;
@property (nonatomic, retain) NSString* address2;
@property (nonatomic, retain) NSString* city;
@property (nonatomic, retain) NSString* date;
@property (nonatomic, retain) NSString* idFromCMS;
@property (nonatomic, retain) NSString* phone1;
@property (nonatomic, retain) NSString* phone2;
@property (nonatomic, retain) NSString* prefix;
@property (nonatomic, retain) NSString* region;
@property (nonatomic, assign) BOOL specialist;
@property (nonatomic, retain) NSString* speciality;
@property (nonatomic, retain) NSString* state;
@property (nonatomic, retain) NSString* suffix;
@property (nonatomic, retain) NSString* website;
@property (nonatomic, retain) NSString* zip;
@property (nonatomic, retain) NSSet* brands;
@property (nonatomic, retain) NSMutableDictionary* parameters;
@property (nonatomic, assign) NSOrderedSet* ratings;
@property (nonatomic, retain) NSSet *subordinates;
@property (nonatomic, retain) PKHealthCareProvider *superior;

+ (PKHealthCareProvider*) findHealthCareProviderWithIdFromCMS:(NSString*)idFromCMS orInsert:(void(^)(PKHealthCareProvider* hcp))didInsert;

@end

@interface PKHealthCareProvider (CoreDataGeneratedAccessors)

- (void) addBrandsObject:(PKBrand*)value;
- (void) removeBrandsObject:(PKBrand*)value;
- (void) addBrands:(NSSet*)values;
- (void) removeBrands:(NSSet*)values;

- (NSSet*) events;
- (void) addSubordinatesObject:(PKHealthCareProvider*)value;
- (void) removeSubordinatesObject:(PKHealthCareProvider*)value;
- (void) addSubordinates:(NSSet*)values;
- (void) removeSubordinates:(NSSet*)values;

- (NSString*)sectionInitial;

@end


@interface NSManagedObjectContext (HealthCareProvider)

- (PKHealthCareProvider*) findHealthCareProviderWithIdFromCMS:(NSString*)idFromCMS;
- (PKHealthCareProvider*) findHealthCareProviderWithIdFromCMS:(NSString*)idFromCMS orInsert:(void(^)(PKHealthCareProvider* hcp))didInsert;

@end