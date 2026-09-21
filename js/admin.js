/**
 * ARC Associates - Admin Photo Management & Automatic Client-Side Image Optimizer
 * Features:
 * - Drag & Drop Image Uploader
 * - Canvas-based automatic image resizing & WebP/JPEG compression
 * - Instant Service/Category Tagging
 * - Persistent Storage (localStorage/IndexedDB)
 * - Live Sync with Public Portfolio & Service Galleries
 */

class ARCPhotoOptimizer {
  constructor() {
    this.maxDimension = 1280; // Max width/height for web performance
    this.quality = 0.82;      // Visual quality factor
  }

  /**
   * Resizes and compresses an image file in the browser
   * @param {File} file 
   * @returns {Promise<{dataUrl: string, originalSize: number, optimizedSize: number, reductionPct: number, width: number, height: number}>}
   */
  async optimizeImage(file) {
    return new Promise((resolve, reject) => {
      const originalSize = file.size;
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;

          // Scale down proportionally if larger than maxDimension
          if (width > height) {
            if (width > this.maxDimension) {
              height = Math.round((height * this.maxDimension) / width);
              width = this.maxDimension;
            }
          } else {
            if (height > this.maxDimension) {
              width = Math.round((width * this.maxDimension) / height);
              height = this.maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          // High quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Export as WebP or standard JPEG
          let format = 'image/jpeg';
          let dataUrl = canvas.toDataURL(format, this.quality);

          // Calculate optimized byte size
          const head = 'data:' + format + ';base64,';
          const optimizedSize = Math.round((dataUrl.length - head.length) * 3 / 4);
          const reductionPct = Math.max(0, Math.round(((originalSize - optimizedSize) / originalSize) * 100));

          resolve({
            dataUrl,
            originalSize,
            optimizedSize,
            reductionPct,
            width,
            height,
            format
          });
        };
        img.onerror = () => reject(new Error("Failed to load image for optimization"));
        img.src = e.target.result;
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

class ARCAdminManager {
  constructor() {
    this.storageKey = 'arc_custom_photos_v1';
    this.optimizer = new ARCPhotoOptimizer();
    this.customPhotos = this.loadPhotos();
    this.currentOptimizedData = null;
  }

  loadPhotos() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.warn("Storage read error:", err);
      return [];
    }
  }

  savePhotos() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.customPhotos));
      // Notify main app
      window.dispatchEvent(new CustomEvent('arc:photos-updated', { detail: this.customPhotos }));
      return true;
    } catch (err) {
      console.error("Storage write error:", err);
      alert("Storage limit reached! Please delete older uploaded photos.");
      return false;
    }
  }

  getAllProjects() {
    // Merge base projects with user-uploaded photos
    return [...this.customPhotos, ...(window.ARC_DATA?.projects || [])];
  }

  addPhoto(photoData) {
    const newEntry = {
      id: 'custom_' + Date.now(),
      title: photoData.title || 'ARC Project Realization',
      category: photoData.category || 'Residential',
      serviceId: photoData.serviceId || 'houses-and-offices',
      location: photoData.location || 'Cuddalore, Tamil Nadu',
      area: photoData.area || 'Turnkey Project',
      year: photoData.year || new Date().getFullYear().toString(),
      image: photoData.image, // Optimized base64 or URL
      description: photoData.description || 'Custom project executed by ARC Associates, Cuddalore.',
      features: photoData.features || ['Turnkey Execution', 'Quality Assurance'],
      isCustom: true,
      timestamp: Date.now()
    };

    this.customPhotos.unshift(newEntry);
    this.savePhotos();
    return newEntry;
  }

  deletePhoto(id) {
    this.customPhotos = this.customPhotos.filter(p => p.id !== id);
    this.savePhotos();
  }

  resetToDefaults() {
    if (confirm("Are you sure you want to reset and clear all custom uploaded photos?")) {
      this.customPhotos = [];
      this.savePhotos();
      location.reload();
    }
  }
}

// Global instance
window.ARC_ADMIN = new ARCAdminManager();
