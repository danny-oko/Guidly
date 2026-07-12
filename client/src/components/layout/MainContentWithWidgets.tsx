import { PropsWithChildren } from 'react';

import ConditionalRightWidgetPanel from '../widgets/ConditionalRightWidgetPanel';
import RightWidgetPanel from '../widgets/RightWidgetPanel';

export default function MainContentWithWidgets({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 bg-app min-w-0 h-screen overflow-hidden">
      <div className="flex h-full min-w-0">
        <div className="min-w-0 flex-1 h-full min-h-0 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
        <ConditionalRightWidgetPanel>
          <div className="hidden xl:block">
            <RightWidgetPanel />
          </div>
        </ConditionalRightWidgetPanel>
      </div>
    </main>
  );
}
