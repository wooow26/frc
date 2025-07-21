import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Play, Clock, BarChart3 } from 'lucide-react';
import { mockAPI } from '../mock/data';

const Courses = () => {
  const [courses, setCourses] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [loading, setLoading] = useState(true);

  const categories = ['Tümü', 'FRC Temelleri', 'Kodlama', 'Elektronik'];

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await mockAPI.getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const getFilteredCourses = () => {
    if (selectedCategory === 'Tümü') {
      return Object.entries(courses).reduce((acc, [category, courseList]) => {
        acc[category] = courseList;
        return acc;
      }, {});
    }
    return { [selectedCategory]: courses[selectedCategory] || [] };
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Başlangıç':
        return 'bg-green-100 text-green-800';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800';
      case 'İleri':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            FRC Kursları
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FRC robotik yarışmalarında başarılı olmak için ihtiyacınız olan tüm bilgileri 
            kategorilere ayrılmış kapsamlı kurslarımızda bulabilirsiniz.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`px-6 py-2 font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white'
                  : 'border-[#E5AE32] text-[#E5AE32] hover:bg-[#E5AE32] hover:text-white'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#E5AE32]">
                {Object.values(courses).flat().length}
              </CardTitle>
              <CardDescription className="text-lg">Toplam Kurs</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#E5AE32]">
                {Object.keys(courses).length}
              </CardTitle>
              <CardDescription className="text-lg">Kategori</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-2 border-[#E5AE32]/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#E5AE32]">
                30+ saat
              </CardTitle>
              <CardDescription className="text-lg">Toplam İçerik</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Courses by Category */}
        <div className="space-y-12">
          {Object.entries(getFilteredCourses()).map(([category, courseList]) => (
            <div key={category}>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-1 h-8 bg-[#E5AE32] mr-4 rounded-full"></div>
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courseList.map((course) => (
                  <Card 
                    key={course.id} 
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-[#E5AE32]/50"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <Button className="bg-white text-[#E5AE32] hover:bg-gray-100">
                          <Play className="mr-2" size={16} />
                          Kursu İzle
                        </Button>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                          {course.title}
                        </CardTitle>
                        <Badge className={`${getLevelColor(course.level)} border-0`}>
                          {course.level}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-600 line-clamp-3">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1" size={16} />
                          {course.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <BarChart3 className="mr-1" size={16} />
                          {course.level}
                        </div>
                      </div>
                      
                      <Link to={`/course/${course.id}`}>
                        <Button 
                          className="w-full bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white font-semibold py-2 transition-all duration-200"
                        >
                          Kursa Başla
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-[#E5AE32]/10 to-[#E5AE32]/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Kendi Hızınızda Öğrenin
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Tüm kurslarımız tamamen ücretsiz! İstediğiniz zaman, istediğiniz yerden 
            FRC robotik dünyasına adım atın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white px-8"
              onClick={() => alert('Takım girişi yakında aktif olacak!')}
            >
              Takım Olarak Katıl
            </Button>
            <Link to="/games">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#E5AE32] text-[#E5AE32] hover:bg-[#E5AE32] hover:text-white px-8"
              >
                Oyunları Dene
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;