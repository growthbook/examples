import 'dart:async';
import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:growthbook_sdk_flutter/growthbook_sdk_flutter.dart';

class ABtestingServiceNetworkClient extends BaseClient {
  const ABtestingServiceNetworkClient();

  @override
  Future<void> consumeGetRequest(
      String path, OnSuccess onSuccess, OnError onError) async {
    try {
      final response =
          await rootBundle.loadStructuredData<Map<String, dynamic>>(
        'asset/features.json',
        (source) async => Map<String, dynamic>.from(json.decode(source)),
      );
      onSuccess(response);
    } catch (e, s) {
      onError(e, s);
    }
  }
}
