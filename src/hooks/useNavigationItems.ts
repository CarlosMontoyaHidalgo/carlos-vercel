import { useLanguage } from '@/providers/LanguageProvider'

export const useNavigationItems = () => {
  const { t } = useLanguage()

  return [
    { name: t('navigation.home'), href: '#hero' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.experience'), href: '#experience' },
    { name: t('navigation.research'), href: '#research' },
    { name: t('navigation.technologies'), href: '#technologies' },
    { name: t('navigation.projects'), href: '#projects' },
    { name: t('navigation.contact'), href: '#contact' },
  ]
}

export default useNavigationItems
