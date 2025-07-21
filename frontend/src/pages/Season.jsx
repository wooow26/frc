import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Clock, MapPin, Users, Trophy, Zap, ArrowRight } from 'lucide-react';
import { mockAPI } from '../mock/data';

const Season = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSeasonNews = async () => {
      try {
        const newsData = await mockAPI.getSeasonNews();
        setNews(newsData);
      } catch (error) {
        console.error('Error loading season news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSeasonNews();
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Takım Kayıt Başvuruları",
      date: "1 Şubat 2025",
      location: "Online",
      type: "registration",
      description: "Yeni takımlar için kayıt başvuruları başlıyor."
    },
    {
      id: 2,
      title: "Kickoff Etkinliği",
      date: "4 Ocak 2025",
      location: "İstanbul, Ankara, İzmir",
      type: "event",
      description: "2026 sezonu resmi olarak başlıyor!"
    },
    {
      id: 3,
      title: "İstanbul Regional",
      date: "15-18 Mart 2025",
      location: "İstanbul Fuar Merkezi",
      type: "competition",
      description: "Türkiye'nin en büyük FRC yarışması."
    },
    {
      id: 4,
      title: "Ankara Regional",
      date: "22-25 Mart 2025", 
      location: "ODTÜ Kültür ve Kongre Merkezi",
      type: "competition",
      description: "Başkent'te heyecan verici yarışmalar."
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'registration':
        return <Users size={20} className="text-blue-600" />;
      case 'event':
        return <Zap size={20} className="text-yellow-600" />;
      case 'competition':
        return <Trophy size={20} className="text-red-600" />;
      default:
        return <Calendar size={20} className="text-gray-600" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'registration':
        return 'border-blue-200 bg-blue-50';
      case 'event':
        return 'border-yellow-200 bg-yellow-50';
      case 'competition':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E5AE32]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-[#E5AE32] text-white px-4 py-2 text-lg mb-4">
            2026 SEZONU
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Yeni Sezon, Yeni Mücadeleler
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            2026 FIRST Robotics Competition sezonu için güncel haberler, 
            önemli tarihler ve yarışma bilgileri.
          </p>
        </div>

        {/* Season Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-2">
                <Trophy size={32} className="text-[#E5AE32]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#E5AE32]">3</CardTitle>
              <CardDescription className="text-lg">Regional Yarışma</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-2">
                <Users size={32} className="text-[#E5AE32]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#E5AE32]">50+</CardTitle>
              <CardDescription className="text-lg">Katılımcı Takım</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-[#E5AE32]/10 rounded-full flex items-center justify-center mb-2">
                <Calendar size={32} className="text-[#E5AE32]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#E5AE32]">18</CardTitle>
              <CardDescription className="text-lg">Hafta Süre</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-1 h-8 bg-[#E5AE32] mr-4 rounded-full"></div>
            Yaklaşan Etkinlikler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className={`border-2 ${getEventColor(event.type)} hover:shadow-lg transition-all duration-200`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getEventIcon(event.type)}
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2" size={16} />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2" size={16} />
                      {event.location}
                    </div>
                  </div>
                  <CardDescription className="text-base mb-4">
                    {event.description}
                  </CardDescription>
                  <Button 
                    size="sm" 
                    className="bg-[#E5AE32] hover:bg-[#E5AE32]/90"
                    onClick={() => alert('Detay sayfası yakında aktif olacak!')}
                  >
                    Detayları Gör
                    <ArrowRight className="ml-2" size={14} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-1 h-8 bg-[#E5AE32] mr-4 rounded-full"></div>
            Son Haberler
          </h2>
          
          <div className="space-y-8">
            {news.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-[#E5AE32]/50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-2 p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary" className="bg-[#E5AE32]/10 text-[#E5AE32]">
                        <Clock className="mr-1" size={14} />
                        {article.date}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base mb-6 line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                    <div className="flex justify-between items-center">
                      <Button 
                        className="bg-[#E5AE32] hover:bg-[#E5AE32]/90"
                        onClick={() => alert('Makale detayı yakında aktif olacak!')}
                      >
                        Haberi Oku
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Season Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-1 h-8 bg-[#E5AE32] mr-4 rounded-full"></div>
            Sezon Takvimi
          </h2>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#E5AE32]/30"></div>
            
            <div className="space-y-8">
              {[
                { date: 'Ocak 2025', title: 'Kickoff & Oyun Duyurusu', status: 'upcoming' },
                { date: 'Ocak - Mart 2025', title: 'Robot İnşa Süreci', status: 'upcoming' },
                { date: 'Mart 2025', title: 'Regional Yarışmalar', status: 'upcoming' },
                { date: 'Nisan 2025', title: 'Şampiyona', status: 'future' }
              ].map((phase, index) => (
                <div key={index} className="relative flex items-center space-x-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    phase.status === 'upcoming' ? 'bg-[#E5AE32] text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{phase.title}</h3>
                    <p className="text-gray-600">{phase.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#E5AE32]/10 to-[#E5AE32]/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            2026 Sezonuna Katılın!
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Takımınızla birlikte bu heyecan verici yolculuğun parçası olun. 
            Kayıt işlemleri için hemen başvurun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white px-8"
              onClick={() => alert('Takım kayıt formu yakında aktif olacak!')}
            >
              Takım Kaydı
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#E5AE32] text-[#E5AE32] hover:bg-[#E5AE32] hover:text-white px-8"
              onClick={() => alert('İletişim sayfasına yönlendiriliyor...')}
            >
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Season;