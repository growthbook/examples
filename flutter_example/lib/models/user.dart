class User {
  final int buildNumber;
  final List<String> roles;

  const User._({
    required this.buildNumber,
    required this.roles,
  });

  factory User.first() {
    return const User._(
      buildNumber: 10,
      roles: [
        'user',
        'tester',
      ],
    );
  }

  factory User.second() {
    return const User._(
      buildNumber: 10,
      roles: [
        'user',
        'admin',
      ],
    );
  }

  factory User.third() {
    return const User._(
      buildNumber: 20,
      roles: [
        'user',
        'tester',
      ],
    );
  }

  Map<String, dynamic> toJson() => {
        'buildNumber': buildNumber,
        'roles': roles,
      };
}
