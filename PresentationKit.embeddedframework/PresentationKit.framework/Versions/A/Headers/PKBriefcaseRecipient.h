@class PKBriefcase;

@interface PKBriefcaseRecipient : NSManagedObject

@property (strong, nonatomic) NSString* firstName;
@property (strong, nonatomic) NSString* lastName;
@property (strong, nonatomic) NSString* email;
@property (strong, nonatomic) PKBriefcase* briefcase;

@end
