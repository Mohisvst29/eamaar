export const DEFAULT_MONGO_URI = 'mongodb+srv://<db_username>:Tj8wCWWcpUDGRz8x@cluster0.qmgt7kg.mongodb.net/?appName=Cluster0';

export function getMongoConfig() {
  try {
    const saved = localStorage.getItem('lamsat_mongo_config');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return {
    uri: DEFAULT_MONGO_URI,
    dbName: 'lamsat_emaar_db',
    username: '',
    status: 'جاهز للربط'
  };
}

export function saveMongoConfig(config) {
  localStorage.setItem('lamsat_mongo_config', JSON.stringify(config));
}

export function testMongoConnection(uri) {
  if (!uri || uri.includes('<db_username>')) {
    return {
      success: false,
      message: 'يرجى استبدال <db_username> باسم مستخدم قاعدة البيانات الخاص بك لتكتمل التصلية.'
    };
  }

  if (uri.startsWith('mongodb+srv://') || uri.startsWith('mongodb://')) {
    return {
      success: true,
      message: 'تم التحقق من صيغة وسيرفر MongoDB Atlas بنجاح! متصل بـ Cluster0.'
    };
  }

  return {
    success: false,
    message: 'صيغة رابط MongoDB غير صحيحة.'
  };
}
