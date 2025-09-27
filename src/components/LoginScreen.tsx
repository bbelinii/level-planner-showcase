import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, Mail, Lock, Chrome } from 'lucide-react';
import pcpLogo from '@/assets/pcp-logo.png';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 p-3">
            <img src={pcpLogo} alt="PCP lite" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">PCP lite</h1>
          <p className="text-muted-foreground">Sistema de Planejamento e Controle</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-2 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Acesso ao Sistema</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o PCP
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail corporativo
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  'Entrar no Sistema'
                )}
              </Button>
            </form>

            {/* Separator */}
            <div className="relative">
              <Separator className="my-6" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                ou continue com
              </span>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 hover:bg-muted/50"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5 mr-3 text-[#4285f4]" />
              Entrar com Google
            </Button>

            {/* Footer Links */}
            <div className="text-center space-y-2 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Problemas para acessar?{' '}
                <button className="text-primary hover:underline font-medium">
                  Fale com o suporte
                </button>
              </p>
              <p className="text-xs text-muted-foreground">
                Sistema seguro e protegido
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Notice */}
        <div className="text-center mt-6 p-3 bg-primary/5 rounded-xl border border-primary/20">
          <p className="text-xs text-primary font-medium">
            🔒 Demonstração - Use qualquer email/senha para entrar
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;