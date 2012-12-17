@class PKBrand;
@class PKDownloadProgress;
@class PKPresentation;
@class PKSupplementalMedia;

typedef enum {
    kPackageDependenciesSelectionNone,
    kPackageDependenciesSelectionSome,
    kPackageDependenciesSelectionAll,
} PackageDependenciesSelection;

typedef enum {
    kPackageStatusInstalled,
    kPackageStatusUpdateIsAvailable,
    kPackageStatusUpdateIsRequired,
} PackageStatus;

extern NSString* const kPackageAssetTypePresentation;
extern NSString* const kPackageAssetTypeBriefcase;


@interface PKPackage : NSManagedObject

@property (nonatomic, retain) NSString * assetType;
@property (nonatomic, retain) NSString * idFromCMS;
@property (nonatomic, retain) NSString * country;
@property (nonatomic, retain) NSDate * creationDate;
@property (nonatomic, retain) NSString * language;
@property (nonatomic, retain) NSString * name;
@property (nonatomic, retain) NSString * summary;
@property (nonatomic, retain) NSString * thumbnailPath;
@property (nonatomic, retain) NSString * title;
@property (nonatomic, retain) NSDate * updateDate;
@property (nonatomic, assign) double sizeOfLatestVersion;
@property (nonatomic, retain) PKBrand *brand;
@property (nonatomic, retain) PKSupplementalMedia* supplementalMedia;

@property (nonatomic, retain) PKPackage *parent;
@property (nonatomic, retain) NSOrderedSet *requiredPackages;

@property (nonatomic, assign) BOOL isOpen;
@property (nonatomic, assign) BOOL selected;

@property (nonatomic, retain) NSString* type;
@property (nonatomic, retain) NSString* deploymentStatus;

@property (nonatomic, retain) NSDate* expirationDate;
@property (nonatomic, assign) PackageStatus status;
@property (nonatomic, retain) NSString* latestVersion;
@property (nonatomic, retain) NSDate* updateByDate;
@property (nonatomic, retain) NSString* installedVersion;
@property (nonatomic, retain) PKDownloadProgress* downloadProgress;

@property (nonatomic, readonly) PKPackage* rootPackage;
@property (nonatomic, readonly, getter=isLatestVersionInstalled) BOOL latestVersionInstalled;
@property (nonatomic, readonly) PackageDependenciesSelection contentDepenciesSelectionState;

@property (nonatomic, strong, readonly) PKPresentation* presentation;

@property (nonatomic, strong, readonly) NSString* pathToRoot;

+ (BOOL) loadPackagesAtPath:(NSString*)pathToPackages error:(NSError**)error;

- (void) setSelected:(BOOL)selected includeDependencies:(BOOL)includeDependencies;
- (BOOL) isUpdateOptional;

- (void) beginDownload;
- (BOOL) installUpdate:(NSError**)errorToReturn;
- (BOOL) uninstallUpdate:(NSError**)errorToReturn;

+ (NSString*) pathToContentFolder;
- (void) deleteFromDevice;
- (BOOL) hasDownloadingChildren;

- (NSArray*) fonts;

@end


@interface PKPackage (CoreDataGeneratedAccessors)

- (void) addRequiredPackagesObject:(PKPackage*)value;
- (void) removeRequiredPackagesObject:(PKPackage*)value;
- (void) addRequiredPackages:(NSOrderedSet*)values;
- (void) removeRequiredPackages:(NSOrderedSet*)values;

@end


@interface NSManagedObjectContext (Package)

- (PKPackage*) findPackageWithIdentifier:(NSString*)identifier error:(NSError**)error;
- (PKPackage*) findPackageWithName:(NSString*)name;
- (PKPackage*) findPackageWithIdFromCMS:(NSInteger)idFromCMS;
- (PKPackage*) findPackageWithIdFromCMS:(NSInteger)idFromCMS orInsert:(void(^)(PKPackage* content))didInsert;
- (PKPackage*) findPackageWithName:(NSString*)name orInsert:(void(^)(PKPackage* content))didInsert;

@end
