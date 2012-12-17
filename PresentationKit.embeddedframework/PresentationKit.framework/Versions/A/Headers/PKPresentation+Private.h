#import "PKPresentation.h"

@interface PKPresentation()

@property (nonatomic, readwrite) NSUInteger supportedOrientations;

- (BOOL) _completeInstallation:(NSError**)error;

@end