class AlmanacHourItem {
  final String label;
  final String status;
  final bool active;

  AlmanacHourItem({
    required this.label,
    required this.status,
    required this.active,
  });

  factory AlmanacHourItem.fromJson(Map<String, dynamic> json) {
    return AlmanacHourItem(
      label: (json['label'] ?? '').toString(),
      status: (json['status'] ?? '').toString(),
      active: json['active'] == true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'label': label,
      'status': status,
      'active': active,
    };
  }
}

class AlmanacModel {
  final String monthTitle;
  final String lunarLine;
  final List<String> yi;
  final List<String> ji;
  final String wuXing;
  final String chongSha;
  final String zhiShen;
  final String shenYiQu;
  final String taiShen;
  final List<String> xiongShen;
  final String baiLu;
  final String currentHourTitle;
  final String xiShen;
  final List<String> hourYi;
  final List<String> hourJi;
  final List<AlmanacHourItem> hours;
  final String vendor;
  final String lang;

  AlmanacModel({
    required this.monthTitle,
    required this.lunarLine,
    required this.yi,
    required this.ji,
    required this.wuXing,
    required this.chongSha,
    required this.zhiShen,
    required this.shenYiQu,
    required this.taiShen,
    required this.xiongShen,
    required this.baiLu,
    required this.currentHourTitle,
    required this.xiShen,
    required this.hourYi,
    required this.hourJi,
    required this.hours,
    this.vendor = '',
    this.lang = 'zh',
  });

  static Map<String, dynamic> _toMap(dynamic value) {
    if (value is Map<String, dynamic>) return value;
    if (value is Map) return Map<String, dynamic>.from(value);
    return <String, dynamic>{};
  }

  factory AlmanacModel.fromResponse(Map<String, dynamic> response) {
    final data = _toMap(response['data']);

    List<String> toStringList(dynamic value) {
      if (value is List) {
        return value.map((e) => e.toString()).toList();
      }
      return <String>[];
    }

    List<AlmanacHourItem> toHours(dynamic value) {
      if (value is List) {
        return value
            .whereType<Map>()
            .map((e) => AlmanacHourItem.fromJson(_toMap(e)))
            .toList();
      }
      return <AlmanacHourItem>[];
    }

    return AlmanacModel(
      monthTitle: (data['monthTitle'] ?? '').toString(),
      lunarLine: (data['lunarLine'] ?? '').toString(),
      yi: toStringList(data['yi']),
      ji: toStringList(data['ji']),
      wuXing: (data['wuXing'] ?? '').toString(),
      chongSha: (data['chongSha'] ?? '').toString(),
      zhiShen: (data['zhiShen'] ?? '').toString(),
      shenYiQu: (data['shenYiQu'] ?? '').toString(),
      taiShen: (data['taiShen'] ?? '').toString(),
      xiongShen: toStringList(data['xiongShen']),
      baiLu: (data['baiLu'] ?? '').toString(),
      currentHourTitle: (data['currentHourTitle'] ?? '').toString(),
      xiShen: (data['xiShen'] ?? '').toString(),
      hourYi: toStringList(data['hourYi']),
      hourJi: toStringList(data['hourJi']),
      hours: toHours(data['hours']),
      vendor: (response['vendor'] ?? '').toString(),
      lang: (response['lang'] ?? 'zh').toString(),
    );
  }
}
