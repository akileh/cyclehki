/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"cyclehki"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Fabric
  #ifndef DEBUG
    NSURL* resourceURL = [[NSBundle mainBundle] URLForResource:@"fabric_api_key.secret" withExtension:nil];
    NSStringEncoding usedEncoding;
    NSString* fabricAPIKey = [NSString stringWithContentsOfURL:resourceURL usedEncoding:&usedEncoding error:NULL];
    // The string that results from reading the bundle resource contains a trailing
    // newline character, which we must remove now because Fabric/Crashlytics
    // can't handle extraneous whitespace.
    NSCharacterSet* whitespaceToTrim = [NSCharacterSet whitespaceAndNewlineCharacterSet];
    NSString* fabricAPIKeyTrimmed = [fabricAPIKey stringByTrimmingCharactersInSet:whitespaceToTrim];
    [Crashlytics startWithAPIKey:fabricAPIKeyTrimmed];
    [Fabric with:@[[Answers class], [Crashlytics class]]];
  #endif
  return YES;
}

@end
