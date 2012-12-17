
@class PKPackage;

typedef enum {
    kDownloadStateReady,
    kDownloadStatePaused,
    kDownloadStateDownloading,
    kDownloadStateDownloaded,
    kDownloadStateFailed,
} DownloadState;

@interface PKDownloadProgress : NSManagedObject

@property (nonatomic, retain) NSString* pathToZipFile;
@property (nonatomic, retain) NSNumber* percentComplete;
@property (nonatomic, retain) NSNumber* bytesDownloaded;
@property (nonatomic, retain) PKPackage* package;
@property (nonatomic, retain) NSString* version;
@property (nonatomic, assign) DownloadState state;
@property (nonatomic, retain) NSDate* dateStarted;

@end
