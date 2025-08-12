import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  initPageTransition(element: string) {
    gsap.from(element, {
      duration: 0.8,
      opacity: 0,
      y: 50,
      ease: 'power3.out'
    });
  }

  initCardAnimation(cards: string) {
    gsap.from(cards, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      stagger: 0.2,
      ease: 'back.out(1.2)'
    });
  }

  initHoverAnimation(element: HTMLElement) {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        duration: 0.3,
        scale: 1.05,
        boxShadow: '0 8px 32px rgba(224, 200, 120, 0.3)',
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.3,
        scale: 1,
        boxShadow: '0 4px 16px rgba(224, 200, 120, 0.2)',
        ease: 'power2.out'
      });
    });
  }
}
