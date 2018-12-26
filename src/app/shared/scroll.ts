import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';

export function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return (): ScrollStrategy => overlay.scrollStrategies.block();
}
