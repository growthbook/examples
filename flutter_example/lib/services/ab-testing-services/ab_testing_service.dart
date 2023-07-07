import 'dart:async';
import 'dart:developer';
import 'dart:io';

import 'package:flutter_example/models/user.dart';
import 'package:growthbook_sdk_flutter/growthbook_sdk_flutter.dart';

/// A singleton service class wrapper around the [GrowthBookSDK].
class GrowthBookClient {
  const GrowthBookClient._();
  static const GrowthBookClient _instance = GrowthBookClient._();
  static GrowthBookClient get instance => _instance;

  static GrowthBookSDK? _sdkInstance;

  /// Initializes the [GrowthBookSDK] if not initialized.
  Future<void> initialize() async {
    _sdkInstance ??= await GBSDKBuilderApp(
      hostURL: 'https://cdn.growthbook.io/',
      apiKey: 'sdk-MpaolWIrCt1tjGgM',
      attributes: {
        if (Platform.isAndroid)
          ...User.first().toJson()
        else
          ...User.second().toJson()
      },
      growthBookTrackingCallBack: (e, r) {
        log("Viewed Experiment");
        log("Experiment Id: ${e.key}");
        log("Variation Id: ${r.variationID}");
        log("Variation: ${r.value}");
      },
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
