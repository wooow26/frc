// Mock data for Turkish FRC Education Platform
export const courses = {
  "FRC Temelleri": [
    {
      id: 1,
      title: "Robotun Temelleri",
      description: "FRC robotlarının temel bileşenlerini ve çalışma prensiplerini öğrenin.",
      duration: "2 saat",
      level: "Başlangıç",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400"
    },
    {
      id: 2, 
      title: "Oyun Kuralları",
      description: "FRC oyun kurallarını detaylı şekilde inceleyin ve strateji geliştirin.",
      duration: "3 saat",
      level: "Başlangıç", 
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400"
    },
    {
      id: 3,
      title: "Takım Stratejisi", 
      description: "Etkili takım çalışması ve yarışma stratejilerini keşfedin.",
      duration: "2.5 saat",
      level: "Orta",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
    }
  ],
  "Kodlama": [
    {
      id: 4,
      title: "Java ile Başlangıç",
      description: "Java programlama dilinin temellerini FRC robotları için öğrenin.",
      duration: "4 saat",
      level: "Başlangıç",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400"
    },
    {
      id: 5,
      title: "WPILib Programlama",
      description: "WPILib kütüphanesi ile robot kontrolü ve sensör entegrasyonu.",
      duration: "5 saat", 
      level: "Orta",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"
    },
    {
      id: 6,
      title: "Otonom Kodlama",
      description: "Robot için otonom hareket algoritmaları ve path planning.",
      duration: "6 saat",
      level: "İleri",
      image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400"
    }
  ],
  "Elektronik": [
    {
      id: 7,
      title: "Motorlar ve Aktüatörler", 
      description: "FRC'de kullanılan motor türleri ve kontrol yöntemleri.",
      duration: "3 saat",
      level: "Başlangıç",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400"
    },
    {
      id: 8,
      title: "Sensörler",
      description: "Robotunuzda kullanabileceğiniz sensör türleri ve uygulamaları.", 
      duration: "3.5 saat",
      level: "Orta",
      image: "https://images.unsplash.com/photo-1581092795442-8cb70a5b68b8?w=400"
    },
    {
      id: 9,
      title: "Kontrol Sistemleri",
      description: "PID kontrol ve gelişmiş kontrol algoritmaları.",
      duration: "4.5 saat", 
      level: "İleri",
      image: "https://images.unsplash.com/photo-1581092786450-7e6eaaac29a2?w=400"
    }
  ]
};

export const games = [
  {
    id: 1,
    title: "FRC Trivia Yarışması",
    description: "FRC hakkındaki bilginizi test edin! 20 soru ile FRC tarihini, kurallarını ve stratejilerini keşfedin.",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400",
    type: "trivia",
    questions: 20,
    difficulty: "Orta"
  },
  {
    id: 2,
    title: "Kodlama Mücadelesi", 
    description: "İlk robot komutunuzu yazın! Basit hareket komutları ile robotunuzu kontrol etmeyi öğrenin.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400", 
    type: "coding",
    challenges: 5,
    difficulty: "Başlangıç"
  },
  {
    id: 3,
    title: "Robot Tasarım Simülatörü",
    description: "Kendi FRC robotunuzu tasarlayın! Bileşenleri seçin, optimize edin ve performansını test edin.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    type: "simulation", 
    components: 15,
    difficulty: "İleri"
  }
];

export const seasonNews = [
  {
    id: 1,
    title: "2026 FIRST Robotics Competition Duyurusu",
    date: "15 Ocak 2025",
    excerpt: "2026 sezonu için heyecan verici yenilikler ve değişiklikler açıklandı.",
    content: "2026 FIRST Robotics Competition sezonu, robotik eğitiminde yeni bir çağı başlatacak. Bu yıl, sürdürülebilirlik teması ile...",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600"
  },
  {
    id: 2,
    title: "Türkiye Regional Yarışmaları",
    date: "22 Ocak 2025", 
    excerpt: "Türkiye'deki regional yarışma tarihleri ve lokasyonları belirlendi.",
    content: "2026 sezonu için Türkiye'de düzenlenecek regional yarışmalar İstanbul, Ankara ve İzmir'de gerçekleştirilecek...",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
  },
  {
    id: 3,
    title: "Yeni Takım Kayıt Süreci",
    date: "28 Ocak 2025",
    excerpt: "2026 sezonu için takım kayıt süreci başladı. Detaylar için tıklayın.",
    content: "Yeni takımlar için kayıt süreci 1 Şubat'ta başlayacak. Gerekli belgeler ve başvuru adımları...",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    team: "Ankara Robotics - Takım 7845",
    content: "Bu platform sayesinde FRC'ye başladık ve ilk yılımızda bölgesel şampiyonluğa ulaştık!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    id: 2,
    name: "Zeynep Kaya", 
    team: "İstanbul Teknik - Takım 9156",
    content: "Kodlama kursları gerçekten çok faydalı. Hiç Java bilmiyorken şimdi robotumuzu programlayabiliyorum.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332a46d?w=100"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    team: "İzmir Mühendislik - Takım 5673", 
    content: "Elektronik modülleri sayesinde sensör entegrasyonunu öğrendim. Harika bir kaynak!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  }
];

// Mock API functions
export const mockAPI = {
  getCourses: () => Promise.resolve(courses),
  getCourse: (id) => {
    const allCourses = Object.values(courses).flat();
    return Promise.resolve(allCourses.find(course => course.id == id));
  },
  getGames: () => Promise.resolve(games),
  getSeasonNews: () => Promise.resolve(seasonNews), 
  getTestimonials: () => Promise.resolve(testimonials),
  submitContact: (formData) => {
    // Simulate form submission
    console.log('Form submitted:', formData);
    localStorage.setItem('lastContact', JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString()
    }));
    return Promise.resolve({ success: true, message: 'Mesajınız başarıyla gönderildi!' });
  }
};