class User {
  final int buildNumber;
  final String id;
  final List<String> roles;

  const User._({
    required this.buildNumber,
    required this.roles,
    required this.id,
  });

  factory User.first() {
    return const User._(
      buildNumber: 10,
      roles: [
        'user',
        'tester',
      ],
      id: 'abc-sdk-dkv',
    );
  }

  factory User.second() {
    return const User._(
      buildNumber: 20,
      roles: [
        'user',
        'tester',
      ],
      id: 'cba-dsk-vdk',
    );
  }

  factory User.third() {
    return const User._(
      buildNumber: 10,
      roles: [
        'user',
        'admin',
      ],
      id: 'bca-dks-dvk',
    );
  }

  Map<String, dynamic> toJson() => {
        'buildNumber': buildNumber,
        'roles': roles,
        'id': id,
      };
}
