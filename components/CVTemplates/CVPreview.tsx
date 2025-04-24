'use client';

import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import ElegantTemplate from './ElegantTemplate';
import SidebarTemplate from './SidebarTemplate';
import CreativeTemplate from './CreativeTemplate';
import TechTemplate from './TechTemplate';

export default function CVPreview({ data, template }: { data: any; template: string }) {
  switch (template) {
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'classic':
    default:
      return <ClassicTemplate data={data} />;
    case 'elegant':
      return <ElegantTemplate data={data} />;
    case 'sidebar':
      return <SidebarTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'tech':
      return <TechTemplate data={data} />;
  
  }
}
