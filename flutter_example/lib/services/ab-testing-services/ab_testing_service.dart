import 'dart:async';

import 'package:flutter_example/models/user.dart';
import 'package:growthbook_sdk_flutter/growthbook_sdk_flutter.dart';

import 'network_client.dart';

/// A singleton service class wrapper around the [GrowthBookSDK].
class ABTestService {
  const ABTestService._();
  static const ABTestService _instance = ABTestService._();
  static ABTestService get instance => _instance;

  static GrowthBookSDK? _sdkInstance;

  /// Initializes the [GrowthBookSDK] if not initialized.
  Future<void> initialize() async {
    _sdkInstance ??= await GBSDKBuilderApp(
      client: const ABtestingServiceNetworkClient(),
      apiKey: '<API_KEY>',
      hostURL: '<HOST_URL>',
      attributes: User.first().toJson(),
      growthBookTrackingCallBack: (e, r) {},
    ).initialize();
  }

  /// Updates the user attribute in [GrowthBookSDK] for validating
  /// feature-flags.
  void updateAttributes(Map<String, dynamic> attributes) {
    _sdkInstance?.setAttributes(attributes);
  }

  /// Provides the value of feature against [feature] .
  T getFeatureValue<T>(String feature, {required T defaultValue}) {
    return _sdkInstance?.feature(feature).value as T? ?? defaultValue;
  }
}
