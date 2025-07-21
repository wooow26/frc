import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert } from './ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Eye, EyeOff, Users } from 'lucide-react';

const TeamRegister = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    team_name: '',
    team_number: '',
    contact_email: '',
    password: '',
    confirmPassword: '',
    description: '',
    location: '',
    founded_year: '',
    website: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setIsLoading(false);
      return;
    }

    // Prepare registration data
    const registrationData = {
      team_name: formData.team_name,
      team_number: formData.team_number || null,
      contact_email: formData.contact_email,
      password: formData.password,
      description: formData.description || null,
      location: formData.location || null,
      founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
      website: formData.website || null
    };

    const result = await register(registrationData);
    
    if (result.success) {
      navigate('/team/dashboard');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E5AE32]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5AE32]/10 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#E5AE32] rounded-full flex items-center justify-center mb-4">
            <Users size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Takım Kaydı</h2>
          <p className="text-gray-600 mt-2">Yeni takım hesabı oluşturun</p>
        </div>

        <Card className="border-2 border-[#E5AE32]/20">
          <CardHeader>
            <CardTitle className="text-xl text-center">Takımınızı Kaydedin</CardTitle>
            <CardDescription className="text-center">
              Takım bilgilerinizi girerek platforma katılın
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <div className="text-red-800 text-sm">{error}</div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Temel Bilgiler
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team_name">Takım Adı *</Label>
                    <Input
                      id="team_name"
                      name="team_name"
                      type="text"
                      required
                      value={formData.team_name}
                      onChange={handleInputChange}
                      placeholder="Örn: Ankara Robotics"
                      className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team_number">FRC Takım Numarası</Label>
                    <Input
                      id="team_number"
                      name="team_number"
                      type="text"
                      value={formData.team_number}
                      onChange={handleInputChange}
                      placeholder="Örn: 7845"
                      className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email">İletişim E-postası *</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    required
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    placeholder="takım@example.com"
                    className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Takım Açıklaması</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Takımınız hakkında kısa bir açıklama..."
                    rows={3}
                    className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Ek Bilgiler
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Konum</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Örn: İstanbul, Türkiye"
                      className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="founded_year">Kuruluş Yılı</Label>
                    <Input
                      id="founded_year"
                      name="founded_year"
                      type="number"
                      min="1992"
                      max={new Date().getFullYear()}
                      value={formData.founded_year}
                      onChange={handleInputChange}
                      placeholder="2020"
                      className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Web Sitesi</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.takımınız.com"
                    className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Güvenlik
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Şifre *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="En az 6 karakter"
                        className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32] pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Şifre Tekrarı *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Şifreyi tekrar girin"
                        className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32] pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white font-semibold py-3 text-lg transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Kayıt Yapılıyor...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" size={18} />
                    Takım Kaydı Yap
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Zaten takım hesabınız var mı?{' '}
                <Link to="/team/login" className="text-[#E5AE32] hover:underline font-medium">
                  Giriş Yap
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="ghost" className="text-[#E5AE32] hover:bg-[#E5AE32]/10">
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamRegister;