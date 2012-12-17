@class PKPackage;
@class PKPresentation;
@class PKBriefcase;

@interface PKSupplementalMedia : NSManagedObject

@property (nonatomic, retain) NSString* type;
@property (nonatomic, retain) NSString* contentFile;
@property (nonatomic, retain) NSString* thumbnailFile;
@property (nonatomic, retain) NSString* rootDirectory;
@property (nonatomic, retain) NSString* contentDescription;
@property (nonatomic, retain) NSString* title;
@property (nonatomic, retain) NSString* brand;
@property (nonatomic, retain) NSString* contentKey;
@property (nonatomic, retain) PKPackage* package;
@property (nonatomic, retain) NSSet* briefcases;
@property (nonatomic, retain) NSSet* presentations;

-(NSString*)pathToAssetDirectory;
-(NSString*)pathToThumbnailDirectory;
-(NSString*)pathToContentDirectory;

+(NSOrderedSet*)mediaItemsForPackage:(PKPackage*)package;
+(NSOrderedSet*)mediaItemsWithNoPackageInManagedContext:(NSManagedObjectContext*)context;

@end


@interface PKSupplementalMedia (CoreDataGeneratedAccessors)

- (void)addBriefcasesObject:(PKBriefcase *)value;
- (void)removeBriefcasesObject:(PKBriefcase *)value;
- (void)addBriefcases:(NSSet *)values;
- (void)removeBriefcases:(NSSet *)values;

@end