

enum PoFErrors {
  /// validator is not configured
  EVALIDATOR_NOT_CONFIGURED = 11,
  /// not a slow wallet
  EWALLET_NOT_SLOW = 12,
  /// validator is jailed
  EIS_JAILED = 13,
  /// no enough vouches
  ETOO_FEW_VOUCHES = 14,
  /// bid is zero
  EBID_IS_ZERO = 15,
  /// bid has expired
  EBID_EXPIRED = 16,
  /// not enough coin balance
  ELOW_UNLOCKED_COIN_BALANCE = 17,

}
