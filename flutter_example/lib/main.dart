import 'package:flutter/material.dart';
import 'package:flutter_example/services/ab-testing-services/ab_testing_service.dart';

import 'models/user.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await ABTestService.instance.initialize();
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    final theme = ABTestService.instance.getFeatureValue<String>(
      'user-theme-pref',
      defaultValue: 'light',
    );
    return MaterialApp(
      themeMode: theme == 'light' ? ThemeMode.light : ThemeMode.dark,
      darkTheme: ThemeData.dark(),
      theme: ThemeData(),
      debugShowCheckedModeBanner: false,
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  /// Set of different user attribute according to which the feature will be
  /// controlled.
  final users = [
    User.first(),
    User.second(),
    User.third(),
  ];

  /// Updates the user attributes in [ABTestService] and re-builds this widget
  /// and the parent widget to reflect the result of feature flag for each user
  /// attribute variation.
  void updateUserAttributes(User user) {
    ABTestService.instance.updateAttributes(user.toJson());
    setState(() {});
    final state = context.findAncestorStateOfType<_MyAppState>();
    state?.setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final update = ABTestService.instance.getFeatureValue<Map<String, dynamic>>(
      'android-app-update',
      defaultValue: {},
    );
    return Scaffold(
      appBar: AppBar(
        title: const Text('Check For Update'),
        actions: [
          PopupMenuButton<User>(
            itemBuilder: (context) => [
              for (var i = 0; i < users.length; i++)
                PopupMenuItem<User>(
                  value: users[i],
                  child: Text(
                    'User $i',
                  ),
                ),
            ],
            onSelected: updateUserAttributes,
          ),
        ],
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // If there is any type of update available.
              if (update.isNotEmpty) ...[
                Text(
                  'New version app version ${update['latestVersion']} is available, update your app to latest version.',
                  textAlign: TextAlign.center,
                ),
                const SizedBox(
                  height: 16,
                ),
                ElevatedButton(
                  onPressed: () {
                    ABTestService.instance.initialize();
                  },
                  child: Text(
                    'Start ${update['updateType']}',
                  ),
                )
              ] else
                // If user is on latest version.
                const Text(
                  'You are on the latest version,\nno updates available.',
                  textAlign: TextAlign.center,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
