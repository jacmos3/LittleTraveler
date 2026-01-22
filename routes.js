// Legacy routes file - Next.js native routing is used instead
// This file is kept for backwards compatibility with imports
import { useRouter } from 'next/router';

export const Router = {
  push: (path) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  },
  replace: (path) => {
    if (typeof window !== 'undefined') {
      window.location.replace(path);
    }
  }
};

export default { Router };
