'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { isMobile, setOpenMobile } = useSidebar()

  // Close mobile sidebar when navigating
  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>VSME Reporting</SidebarGroupLabel>
      <SidebarMenu role="navigation" aria-label="Main navigation">
        {items.map((item) => (
          <Collapsible
            asChild
            className="group/collapsible"
            defaultOpen={item.isActive}
            key={item.title}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    // Enhanced touch targets for mobile
                    isMobile && "min-h-[44px] py-3"
                  )}
                >
                  <Link
                    href={item.url}
                    onClick={handleNavigation}
                    aria-expanded={item.isActive}
                    aria-describedby={item.items?.length ? `${item.title.replace(/\s+/g, '-').toLowerCase()}-submenu` : undefined}
                  >
                    {item.icon && <item.icon aria-hidden="true" />}
                    <span>{item.title}</span>
                    {item.items?.length && (
                      <ChevronRight
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items?.length && (
                <CollapsibleContent>
                  <SidebarMenuSub
                    role="menu"
                    aria-label={`${item.title} submenu`}
                    id={`${item.title.replace(/\s+/g, '-').toLowerCase()}-submenu`}
                  >
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title} role="none">
                        <SidebarMenuSubButton
                          asChild
                          className={cn(
                            // Enhanced touch targets for mobile
                            isMobile && "min-h-[40px] py-2"
                          )}
                        >
                          <Link
                            href={subItem.url}
                            onClick={handleNavigation}
                            role="menuitem"
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
