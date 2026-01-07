import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [activeSection, setActiveSection] = useState<'home' | 'servers' | 'rules' | 'apply'>('home');
  const [formData, setFormData] = useState({ name: '', age: '', experience: '', why: '' });
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let count = 0;
    const target = 44;
    const duration = 2000;
    const increment = target / (duration / 50);
    
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        setOnlinePlayers(target);
        clearInterval(timer);
      } else {
        setOnlinePlayers(Math.floor(count));
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const servers = [
    { name: 'Survival', players: '24/100', status: 'online', ip: 'survival.server.net' },
    { name: 'Creative', players: '12/50', status: 'online', ip: 'creative.server.net' },
    { name: 'Hardcore', players: '8/30', status: 'online', ip: 'hardcore.server.net' },
  ];

  const rules = [
    { title: 'Уважение к игрокам', desc: 'Запрещены оскорбления, грифинг и любые формы токсичного поведения.' },
    { title: 'Честная игра', desc: 'Использование читов, дюпов и багов строго запрещено.' },
    { title: 'Постройки', desc: 'Стройте на расстоянии минимум 100 блоков от чужих построек.' },
    { title: 'Чат', desc: 'Запрещен спам, реклама и мат. Общайтесь культурно.' },
    { title: 'Администрация', desc: 'Решение администрации окончательно. Споры решаются в личке.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.experience || !formData.why) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }
    toast({ title: 'Заявка отправлена!', description: 'Мы рассмотрим её в течение 24 часов.' });
    setFormData({ name: '', age: '', experience: '', why: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-xl">⛏️</span>
              </div>
              <span className="text-xl font-bold">MineCraft Server</span>
            </div>
            <div className="flex gap-1">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'servers', label: 'Серверы', icon: 'Server' },
                { id: 'rules', label: 'Правила', icon: 'BookOpen' },
                { id: 'apply', label: 'Заявка', icon: 'FileText' },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id as any)}
                  className="gap-2"
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <section className="text-center space-y-6 py-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary">Онлайн сейчас:</span>
                </div>
                <span className="text-2xl font-bold text-primary tabular-nums">{onlinePlayers}</span>
                <span className="text-sm text-muted-foreground">/ 180</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
                Добро пожаловать на <span className="text-primary">наш сервер</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Присоединяйся к дружному сообществу игроков. Выживание, креатив и хардкор режимы доступны 24/7.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" className="gap-2" onClick={() => setActiveSection('servers')}>
                  <Icon name="Play" size={20} />
                  Играть сейчас
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={() => setActiveSection('apply')}>
                  <Icon name="UserPlus" size={20} />
                  Подать заявку
                </Button>
              </div>
            </section>

            <section className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Галерея сервера</h2>
                <p className="text-muted-foreground">Посмотри, что создали наши игроки</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { img: 'https://cdn.poehali.dev/projects/91ce81e7-60bf-4879-83d5-f20a3afde267/files/94956dae-067e-42c3-931e-db979d784aa0.jpg', title: 'Survival', desc: 'Выживание в мире' },
                  { img: 'https://cdn.poehali.dev/projects/91ce81e7-60bf-4879-83d5-f20a3afde267/files/987ff83c-44d1-4156-acf9-3a6d004017cc.jpg', title: 'Creative', desc: 'Креативные постройки' },
                  { img: 'https://cdn.poehali.dev/projects/91ce81e7-60bf-4879-83d5-f20a3afde267/files/5ea6ea9d-cc24-422e-9229-9e89e3171dde.jpg', title: 'Hardcore', desc: 'Экстрим режим' },
                ].map((screenshot, i) => (
                  <Card key={i} className="border-border/50 hover:border-primary/50 transition-all hover:scale-105 overflow-hidden">
                    <img src={screenshot.img} alt={screenshot.title} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <CardTitle className="text-xl">{screenshot.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{screenshot.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Users', title: 'Активное сообщество', desc: 'Более 500 активных игроков' },
                { icon: 'Shield', title: 'Защита от гриферов', desc: 'Надёжная система приватов' },
                { icon: 'Zap', title: 'Высокая производительность', desc: 'Сервер на SSD с 99.9% uptime' },
              ].map((feature, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={feature.icon as any} size={24} className="text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </section>
          </div>
        )}

        {activeSection === 'servers' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Игровые серверы</h2>
              <p className="text-muted-foreground">Выбери режим игры и начни приключение</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {servers.map((server, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-2xl">{server.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs text-primary font-medium">ONLINE</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Users" size={16} />
                        <span className="text-sm">Игроков: {server.players}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Globe" size={16} />
                        <span className="text-sm font-mono">{server.ip}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 gap-2 font-mono text-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(server.ip);
                          toast({ title: 'IP скопирован!', description: server.ip });
                        }}
                      >
                        <Icon name="Copy" size={14} />
                        {server.ip}
                      </Button>
                    </div>
                    <Button className="w-full gap-2">
                      <Icon name="Play" size={16} />
                      Подключиться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'rules' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Правила сервера</h2>
              <p className="text-muted-foreground">Соблюдай правила и получай удовольствие от игры</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {rules.map((rule, i) => (
                <Card key={i} className="border-border/50">
                  <CardHeader>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {i + 1}
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{rule.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">{rule.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'apply' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Заявка на вступление</h2>
              <p className="text-muted-foreground">Заполни форму, чтобы присоединиться к серверу</p>
            </div>
            <Card className="max-w-2xl mx-auto border-border/50">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Игровой ник</Label>
                    <Input
                      id="name"
                      placeholder="Steve123"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Возраст</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="18"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Опыт игры в Minecraft</Label>
                    <Input
                      id="experience"
                      placeholder="Играю 5 лет"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="why">Почему хотите присоединиться?</Label>
                    <Textarea
                      id="why"
                      placeholder="Расскажите о себе и почему вы хотите играть на нашем сервере..."
                      className="min-h-32"
                      value={formData.why}
                      onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" size="lg">
                    <Icon name="Send" size={18} />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 MineCraft Server. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Discord</a>
              <a href="#" className="hover:text-primary transition-colors">VK</a>
              <a href="#" className="hover:text-primary transition-colors">Telegram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}