import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert } from './ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Eye, EyeOff, Users } from 'lucide-react';

const TeamLogin = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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

    const result = await login(formData);
    
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
    <div className="min-h-screen bg-gradient-to-br from-[#E5AE32]/10 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#E5AE32] rounded-full flex items-center justify-center mb-4">
            <Users size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Takım Girişi</h2>
          <p className="text-gray-600 mt-2">Takım hesabınıza giriş yapın</p>
        </div>

        <Card className="border-2 border-[#E5AE32]/20">
          <CardHeader>
            <CardTitle className="text-xl text-center">Giriş Yap</CardTitle>
            <CardDescription className="text-center">
              Takım e-posta adresiniz ve şifrenizle giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <div className="text-red-800 text-sm">{error}</div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="takım@example.com"
                  className="border-gray-300 focus:border-[#E5AE32] focus:ring-[#E5AE32]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Şifrenizi girin"
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

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white font-semibold py-3 text-lg transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Giriş Yapılıyor...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2" size={18} />
                    Giriş Yap
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Henüz takım hesabınız yok mu?{' '}
                <Link to="/team/register" className="text-[#E5AE32] hover:underline font-medium">
                  Takım Kaydı Yap
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

export default TeamLogin;