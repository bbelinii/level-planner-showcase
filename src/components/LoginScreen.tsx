import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Facebook, Chrome, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import pcpHeroImage from '@/assets/pcp-lite-hero.png';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.password) {
      toast({
        title: "Senha obrigatória",
        description: "Por favor, insira sua senha",
        variant: "destructive",
      });
      return false;
    }

    if (isSignUp) {
      if (!formData.name) {
        toast({
          title: "Nome obrigatório",
          description: "Por favor, insira seu nome",
          variant: "destructive",
        });
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Senhas não coincidem",
          description: "Por favor, confirme sua senha corretamente",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Ação simulada",
        description: isSignUp ? "Conta criada com sucesso!" : "Login realizado com sucesso!",
      });
      onLogin();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Ação simulada",
        description: `Login com ${provider} simulado`,
      });
      onLogin();
    }, 1000);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-scale-in">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-elevated overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Left Column - Form */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-sm mx-auto w-full">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {isSignUp ? 'Criar conta' : 'Entrar'}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {isSignUp ? 'Cadastre-se para começar' : 'ou use sua conta'}
                  </p>
                </div>

                {/* Social Login Buttons - Only show on sign in */}
                {!isSignUp && (
                  <div className="flex justify-center gap-4 mb-8">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full border-2 hover:bg-blue-50 hover:border-blue-200"
                      onClick={() => handleSocialLogin('Facebook')}
                      disabled={isLoading}
                      aria-label="Entrar com Facebook"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full border-2 hover:bg-red-50 hover:border-red-200"
                      onClick={() => handleSocialLogin('Google')}
                      disabled={isLoading}
                      aria-label="Entrar com Google"
                    >
                      <Chrome className="h-5 w-5 text-red-500" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full border-2 hover:bg-blue-50 hover:border-blue-200"
                      onClick={() => handleSocialLogin('LinkedIn')}
                      disabled={isLoading}
                      aria-label="Entrar com LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-blue-700" />
                    </Button>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Field - Only for Sign Up */}
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Nome completo
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-primary"
                        required={isSignUp}
                      />
                    </div>
                  )}
                  
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Confirm Password - Only for Sign Up */}
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Confirmar senha
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="h-12 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-primary"
                        required={isSignUp}
                      />
                    </div>
                  )}

                  {/* Forgot Password - Only for Sign In */}
                  {!isSignUp && (
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-gray-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                        onClick={() => toast({ title: "Ação simulada", description: "Link de recuperação enviado!" })}
                      >
                        Esqueceu sua senha?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-full transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{isSignUp ? 'Criando...' : 'Entrando...'}</span>
                      </div>
                    ) : (
                      isSignUp ? 'CRIAR CONTA' : 'ENTRAR'
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column - Promotional Panel */}
            <div className="flex-1 bg-gradient-auth text-white p-8 lg:p-12 flex flex-col justify-center items-center text-center lg:order-last order-first">
              <div className="max-w-sm">
                
                {/* Logo/Image */}
                <div className="mb-8">
                  <img 
                    src={pcpHeroImage} 
                    alt="PCP Lite - Sistema de Planejamento e Controle da Produção" 
                    className="mx-auto max-w-full h-auto"
                  />
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {isSignUp ? 'Bem-vindo de volta!' : 'Olá, amigo!'}
                  </h2>
                  <p className="text-white/90 leading-relaxed">
                    PCP Lite — site acadêmico para demonstrar Estratégico, Tático e Operacional com fluxos, dashboards e checklists; entre e continue o estudo
                  </p>
                </div>

                {/* Toggle Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-500 px-8 py-3 rounded-full font-medium transition-all duration-200"
                  onClick={toggleMode}
                  disabled={isLoading}
                >
                  {isSignUp ? 'ENTRAR' : 'CRIAR CONTA'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="text-center mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-sm text-primary font-medium">
            🎓 Demonstração acadêmica - Funcionalidades simuladas
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;