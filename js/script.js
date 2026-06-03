(function () {
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll("[data-section-link]"));
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
  var aboutMedia = document.getElementById("about-media");
  var orbA = document.querySelector('[data-orb="a"]');
  var orbB = document.querySelector('[data-orb="b"]');
  var projectCards = Array.prototype.slice.call(document.querySelectorAll(".project-card"));
  var portfolioSection = document.getElementById("portfolio");
  var projectRoute = document.getElementById("project-route");
  var projectRouteTitle = document.getElementById("project-route-title");
  var projectRouteIntro = document.getElementById("project-route-intro");
  var projectRouteVideo = document.getElementById("project-route-video");
  var projectRouteDescription = document.getElementById("project-route-description");
  var projectCloseTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-project-close]"));
  var projectBackLinks = Array.prototype.slice.call(document.querySelectorAll("[data-project-back]"));
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobileQuery = window.matchMedia("(max-width: 768px)");
  var animationFrameId = null;
  var navigationTimer = null;
  var projectRouteAnimationFrameId = null;
  var projectRouteCloseTimer = null;
  var defaultDocumentTitle = document.title;
  var projectRouteTransitionMs = reducedMotion ? 0 : 260;

  function buildYouTubeVideoEmbedUrl(videoId) {
    return "https://www.youtube.com/embed/" + videoId + "?rel=0";
  }

  function buildYouTubeVideoWatchUrl(videoId) {
    return "https://www.youtube.com/watch?v=" + videoId;
  }

  function buildYouTubeVideoThumbnailUrl(videoId) {
    return "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";
  }

  var projectData = {
    peterpan: {
      title: "Peter Pan's Neverland Adventure",
      intro: "Tokyo DisneySea - Urayasu, Chiba, Japan",
      description: "This was the first project I worked on when I joined Walt Disney Animation Studios in 2019. The ride features stereoscopic 3D projection, practical sets, and a trackless ride system to immerse guests in a new story based on the environments and characters of the original 1953 animated film. As an assistant technical director, I built tools to support the review process, which involved many artists and stakeholders across the animation studio and Walt Disney Imagineering. As a technical supervisor, I oversaw delivery of the project for several years following, until its opening in June, 2024.\n\nMore information and samples of work can be available on request.",
      video: buildYouTubeVideoEmbedUrl("W_Sh7-_zD38"),
      accent: "#5f8d37"
    },
    wondrousjourneys: {
      title: "Wondrous Journeys Fireworks Show",
      intro: "Disneyland Park - Anaheim, CA",
      description: "I had the opportunity to serve as technical supervisor of Walt Disney Animation Studios' Creative Legacy team during the studio's 100th anniversary year. In this role, I helped lead the delivery of assets for the Wondrous Journeys fireworks show at Disneyland Park, which celebrates the stories and characters of Disney animation with a combination of pyrotechnics, projection mapping, and other special effects. The show premiered in January 2023 and continues to show nightly at the park.\n\nMore information and samples of work can be available on request.",
      videoLink: buildYouTubeVideoWatchUrl("QeuhMBRYoa0"),
      videoPoster: buildYouTubeVideoThumbnailUrl("QeuhMBRYoa0"),
      accent: "#7f4ed8"
    },
    theforge: {
      title: "The Control Room at the Forge",
      intro: "Accenture Federal Services - Washington, D.C.",
      description: "I joined Fivestone Studios in 2025 as a Senior Creative Technologist. In collaboration with our partners at Dimensional Innovations, I contributed to the development of the Control Room experience for the Forge, a new innovation center and showroom in Washington, D.C. operated by Accenture Federal Services. The Control Room is a cavelike immersive theater that showcases Accenture's work with government clients through a combination of interactive elements and custom-built media.",
      descriptionLink: {
        text: "More from Dimensional Innovations",
        href: "https://dimin.com/work/accenture-federal-services-the-forge"
      },
      accent: "#7d4bce"
    },
    frozenjourney: {
      title: "Anna and Elsa's Frozen Journey",
      intro: "Tokyo DisneySea - Urayasu, Chiba, Japan",
      description: "During my time as technical supervisor of Creative Legacy at Walt Disney Animation Studios, I contributed to the development of projected media for this seven minute long attraction. The ride is a true retelling of the original 2013 film. Several projected media scenes appear throughout the queue and attraction which our team conceptualized and executed for the ride's opening in June 2024.\n\nMore information and samples of work can be available on request.",
      video: buildYouTubeVideoEmbedUrl("gp0VO2ME_o4"),
      accent: "#76c9f4"
    },
    immersiveexperience: {
      title: "Disney Immersive Experience",
      intro: "Locations Worldwide",
      description: "This project was installed in locations around the world. I had the pleasure of seeing it in my home city of Minneapolis, Minnesota after completing work on it in 2023. The experience immerses guests in large-scale projections of scenes from Disney animated films, accompanied by music and special effects. My role was to help build the media pipeline and tools that supported the creation and delivery of the projected content.\n\nMore information and samples of work can be available on request.",
      video: buildYouTubeVideoEmbedUrl("4vMK3Jr37uQ"),
      accent: "#f7a039"
    },
    zootopia: {
      title: "Zootopia Hot Pursuit",
      intro: "Shanghai Disneyland - Shanghai, China",
      description: "Towards the start of my time as a supervisor at Walt Disney Animation Studios, I oversaw the delivery of media for this trackless dark ride at Shanghai Disneyland. The project features several large dome screens which immerse guests in the world of Zootopia. I worked closely with artists and Imagineers to ensure smooth delivery of assets for scene integration and helped troubleshoot technical issues during final stages of production.\n\nMore information and samples of work can be available on request.",
      video: buildYouTubeVideoEmbedUrl("uZY5xLqRd48"),
      accent: "#2f7fff"
    },
    tianasbayou: {
      title: "Tiana's Bayou Adventure",
      intro: "Disneyland Park - Anaheim, CA & Walt Disney World Magic Kingdom - Orlando, FL",
      description: "I had the opportunity of leading media delivery for Tiana's Bayou Adventure, which exists in two locations at Disneyland Park in Anaheim, California and the Magic Kingdom at Walt Disney World in Orlando, Florida. The ride features several projected media scenes, including one animated in the original 2D style of the 2009 animated film Princess and the Frog.\n\nMore information and samples of work can be available on request.",
      video: buildYouTubeVideoEmbedUrl("RLmhNWq5kT0"),
      accent: "#295d30"
    },
    tinkerbell: {
      title: "Tinker Bell's Busy Buggies",
      intro: "Tokyo DisneySea - Urayasu, Chiba, Japan",
      description: "I had the fun chance to provide technical support and guidance for one media scene in this family-friendly attraction. The first scene of the ride features a media element of Tinkerbell asking us for help delivering items to her friends in Pixie Hollow. I ensured we had a smooth pipeline for delivering this scene in nighttime and daytime environments while keeping physical show elements and ride movement in mind. The ride opened in June 2024.\n\nMore information and samples of work can be available on request.",
      video: buildYouTubeVideoEmbedUrl("1EErJ3rsQ4s"),
      accent: "#f78dcf"
    },
    moana2: {
      title: "Moana 2",
      intro: "2024 Feature Film",
      description: "I served as a technical director on Moana 2, primarily focused on supporting the specialized 2D animation pipeline for Maui's 'mini Maui' tattoo character. \n\nFrom the WDAS website's Filmmaking Process page in 2025: \n\tTo support this workflow, the Technical Director team created a custom pipeline to format the 2D animation into one of twelve tattoo templates that corresponded to different regions of the body, such as his bicep. The TD team developed a user interface to allow 2D artists to select which region of CG Maui’s body they wanted the animation to be applied to. Additionally, the TDs developed preview and render workflows so CG animators and technical animation artists could see the 2D animation on CG Maui as they polished performance. Finally, the Look Development and Lighting teams brought the tattoos to life with a realistic tattoo skin shader and lighting that highlighted Mini Maui’s motion.",
      videoLink: buildYouTubeVideoWatchUrl("GsdxoL89Qsc"),
      videoPoster: buildYouTubeVideoThumbnailUrl("GsdxoL89Qsc"),
      accent: "#113c82"
    },
    encanto: {
      title: "Encanto",
      intro: "2021 Feature Film",
      description: "The first feature film I worked on at Walt Disney Animation Studios was Encanto, which released in November 2021. I served as a technical director on the film, primarily focused on supporting layout and previsualization workflows. Over the course of my time at the studio, I gained a reputation for building tools to support the highly stylized musical sequences at the studio. This started with the Surface Pressure sequence, where I built pipelines to allow easy animation and render-time visualization of objects she picks up and throws around the environment.",
      videoLink: buildYouTubeVideoWatchUrl("tQwVKr8rCYw"),
      videoPoster: buildYouTubeVideoThumbnailUrl("tQwVKr8rCYw"),
      accent: "#d8b147"
    },
    strivr: {
      title: "STRIVR Soft Skills",
      intro: "Menlo Park, CA",
      description: "I began my career as a Software Engineer at STRIVR, a virtual reality company focused on immersive training solutions. I contributed to the development of STRIVR's soft skills training platform, which uses VR to help users practice interpersonal skills in realistic scenarios. In addition to my development work, I was highly involved with the pilot program for the product, which included working closely with early clients to understand their needs and iterating on the product based on their feedback.",
      video: buildYouTubeVideoEmbedUrl("tX8Ji2iI2Bc"),
      accent: "#1f4c87"
    }
  };

  function buildProjectPath(slug) {
    return "/portfolio/" + slug;
  }

  function buildPortfolioPath() {
    return "/#portfolio";
  }

  function normalizePath(pathname) {
    return pathname.replace(/\/+$/, "") || "/";
  }

  function getProjectSlugFromPath(pathname) {
    var normalizedPath = normalizePath(pathname);
    var routeMatch = normalizedPath.match(/^\/portfolio\/([^/]+)$/);

    if (!routeMatch) {
      return null;
    }

    return routeMatch[1];
  }

  function getRequestedPath() {
    var searchParams = new window.URLSearchParams(window.location.search);
    var redirectedPath = searchParams.get("route");

    if (redirectedPath) {
      return redirectedPath;
    }

    return window.location.pathname + window.location.search + window.location.hash;
  }

  function setMultilineText(element, text) {
    var lines;
    var tabMatch;
    var lineElement;
    var lineText;
    var tabCount;

    if (!element) {
      return;
    }

    lines = String(text || "").split("\n");
    element.replaceChildren();

    lines.forEach(function (line, index) {
      if (index > 0) {
        element.appendChild(document.createElement("br"));
      }

      tabMatch = line.match(/^(\t+)/);

      if (!tabMatch) {
        element.appendChild(document.createTextNode(line));
        return;
      }

      tabCount = tabMatch[1].length;
      lineText = line.slice(tabCount);
      lineElement = document.createElement("span");
      lineElement.style.display = "block";
      lineElement.style.marginLeft = tabCount + "rem";
      lineElement.style.fontStyle = "italic";
      lineElement.textContent = lineText;
      element.appendChild(lineElement);
    });
  }

  function renderProjectDescription(project) {
    var descriptionLink;

    if (!projectRouteDescription) {
      return;
    }

    setMultilineText(projectRouteDescription, project.description);

    if (!project.descriptionLink) {
      return;
    }

    projectRouteDescription.appendChild(document.createElement("br"));
    projectRouteDescription.appendChild(document.createElement("br"));

    descriptionLink = document.createElement("a");
    descriptionLink.className = "project-page__description-link";
    descriptionLink.href = project.descriptionLink.href;
    descriptionLink.textContent = project.descriptionLink.text;
    descriptionLink.target = "_blank";
    descriptionLink.rel = "noreferrer";
    projectRouteDescription.appendChild(descriptionLink);
  }

  function renderProjectMedia(project) {
    var mediaLink;
    var mediaPoster;
    var mediaLabel;
    var videoFrame;

    if (!projectRouteVideo) {
      return;
    }

    projectRouteVideo.hidden = !project.video && !project.videoLink;
    projectRouteVideo.classList.remove("is-loading");
    projectRouteVideo.classList.remove("is-ready");
    projectRouteVideo.classList.remove("has-fallback-link");
    projectRouteVideo.replaceChildren();

    if (project.video) {
      projectRouteVideo.classList.add("is-loading");
      videoFrame = document.createElement("iframe");

      videoFrame.className = "project-page__frame";
      videoFrame.title = project.title + " video";
      videoFrame.loading = "lazy";
      videoFrame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      videoFrame.referrerPolicy = "strict-origin-when-cross-origin";
      videoFrame.allowFullscreen = true;
      videoFrame.onload = function () {
        projectRouteVideo.classList.remove("is-loading");
        projectRouteVideo.classList.add("is-ready");
      };
      videoFrame.src = project.video;
      projectRouteVideo.replaceChildren(videoFrame);
      return;
    }

    if (!project.videoLink) {
      return;
    }

    mediaLink = document.createElement("a");
    mediaLink.className = "project-page__media-link";
    mediaLink.href = project.videoLink;
    mediaLink.target = "_blank";
    mediaLink.rel = "noreferrer";
    mediaLink.setAttribute("aria-label", "Watch " + project.title + " on YouTube");

    mediaPoster = document.createElement("img");
    mediaPoster.className = "project-page__media-poster";
    mediaPoster.src = project.videoPoster;
    mediaPoster.alt = project.title + " YouTube thumbnail";
    mediaPoster.loading = "lazy";

    mediaLabel = document.createElement("span");
    mediaLabel.className = "project-page__media-label";
    mediaLabel.textContent = "Watch on YouTube";

    mediaLink.appendChild(mediaPoster);
    mediaLink.appendChild(mediaLabel);
    projectRouteVideo.classList.add("is-ready");
    projectRouteVideo.classList.add("has-fallback-link");
    projectRouteVideo.replaceChildren(mediaLink);
  }

  function renderProjectRoute(project) {
    if (!projectRoute || !projectRouteTitle || !projectRouteIntro || !projectRouteVideo || !projectRouteDescription) {
      return;
    }

    projectRoute.style.setProperty("--project-accent", project.accent);
    projectRouteTitle.textContent = project.title;
    projectRouteIntro.textContent = project.intro;
    renderProjectDescription(project);
    renderProjectMedia(project);

    document.title = project.title + " | Shannon Kraemer";
    document.body.classList.add("is-project-route");

    if (projectRouteAnimationFrameId) {
      window.cancelAnimationFrame(projectRouteAnimationFrameId);
      projectRouteAnimationFrameId = null;
    }

    if (projectRouteCloseTimer) {
      window.clearTimeout(projectRouteCloseTimer);
      projectRouteCloseTimer = null;
    }

    projectRoute.hidden = false;
    projectRoute.setAttribute("aria-hidden", "false");
    projectRoute.classList.remove("is-closing");
    projectRoute.classList.remove("is-open");

    if (reducedMotion) {
      projectRoute.classList.add("is-open");
    } else {
      projectRouteAnimationFrameId = window.requestAnimationFrame(function () {
        projectRoute.classList.add("is-open");
        projectRouteAnimationFrameId = null;
      });
    }

    setActiveSection("portfolio");
  }

  function showPortfolioSection(scrollBehavior) {
    setActiveSection("portfolio");

    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: scrollBehavior || (reducedMotion ? "auto" : "smooth"), block: "start" });
    }
  }

  function clearProjectRoute(skipAnimation) {
    if (!projectRoute || !projectRouteVideo) {
      return;
    }

    projectRoute.setAttribute("aria-hidden", "true");

    if (projectRouteAnimationFrameId) {
      window.cancelAnimationFrame(projectRouteAnimationFrameId);
      projectRouteAnimationFrameId = null;
    }

    if (projectRouteCloseTimer) {
      window.clearTimeout(projectRouteCloseTimer);
      projectRouteCloseTimer = null;
    }

    function finalizeProjectRouteClose() {
      projectRoute.hidden = true;
      projectRoute.classList.remove("is-open");
      projectRoute.classList.remove("is-closing");
      projectRouteVideo.classList.remove("is-loading");
      projectRouteVideo.classList.remove("is-ready");

      if (projectRouteVideo.tagName === "IFRAME") {
        projectRouteVideo.onload = null;
        projectRouteVideo.src = "";
      } else {
        projectRouteVideo.replaceChildren();
      }

      document.title = defaultDocumentTitle;
      document.body.classList.remove("is-project-route");
    }

    if (skipAnimation || reducedMotion || projectRoute.hidden) {
      finalizeProjectRouteClose();
      return;
    }

    projectRoute.classList.add("is-closing");
    projectRoute.classList.remove("is-open");
    projectRouteCloseTimer = window.setTimeout(function () {
      finalizeProjectRouteClose();
      projectRouteCloseTimer = null;
    }, projectRouteTransitionMs);
  }

  function openProjectRoute(slug, historyMode) {
    var project = projectData[slug];

    if (!project) {
      clearProjectRoute(true);
      return;
    }

    if (historyMode === "push") {
      if (window.location.pathname + window.location.hash !== buildPortfolioPath()) {
        window.history.replaceState({}, "", buildPortfolioPath());
      }

      window.history.pushState({ projectSlug: slug }, "", buildProjectPath(slug));
    } else if (historyMode === "replace") {
      window.history.replaceState({ projectSlug: slug }, "", buildProjectPath(slug));
    } else if (historyMode === "stack") {
      window.history.replaceState({}, "", buildPortfolioPath());
      window.history.pushState({ projectSlug: slug }, "", buildProjectPath(slug));
    }

    renderProjectRoute(project);
  }

  function closeProjectRoute(historyMode) {
    if (historyMode === "push") {
      window.history.back();
      return;
    } else if (historyMode === "replace") {
      window.history.replaceState({}, "", buildPortfolioPath());
    }

    clearProjectRoute();
    showPortfolioSection();
  }

  function syncProjectRouteWithLocation(historyMode) {
    var requestedPath = getRequestedPath();
    var slug = getProjectSlugFromPath(requestedPath.split("?")[0].split("#")[0]);

    if (!slug) {
      clearProjectRoute();

      if (window.location.hash === "#portfolio") {
        showPortfolioSection("auto");
      }

      return;
    }

    if (window.location.search.indexOf("route=") !== -1) {
      openProjectRoute(slug, historyMode || "stack");
      return;
    }

    openProjectRoute(slug, historyMode || null);
  }

  function setActiveSection(sectionId) {
    sectionLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-section-link") === sectionId);
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("data-section"));
          }
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.1
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function placeOrbs(primaryX, primaryY, secondaryX, secondaryY) {
    if (!orbA || !orbB) {
      return;
    }

    orbA.style.setProperty("--reveal-x", primaryX + "%");
    orbA.style.setProperty("--reveal-y", primaryY + "%");
    orbB.style.setProperty("--reveal-x", secondaryX + "%");
    orbB.style.setProperty("--reveal-y", secondaryY + "%");
  }

  function handlePointerMove(event) {
    if (!aboutMedia || mobileQuery.matches || reducedMotion) {
      return;
    }

    var relativeX = event.clientX / window.innerWidth;
    var relativeY = event.clientY / window.innerHeight;
    var mirroredX = 1 - Math.max(0.08, Math.min(0.92, relativeX));
    var clampedY = Math.max(0.12, Math.min(0.88, relativeY));
    var offsetX = Math.max(0.14, Math.min(0.86, mirroredX * 0.74 + 0.12));
    var offsetY = clampedY * 0.7 + 0.14;

    placeOrbs(offsetX * 100, offsetY * 100, (1 - offsetX) * 100, (1 - offsetY * 0.9) * 100);
  }

  function resetOrbs() {
    placeOrbs(82, 30, 18, 70);
  }

  function animateMobileOrbit() {
    if (!aboutMedia || !mobileQuery.matches || reducedMotion) {
      animationFrameId = null;
      return;
    }

    var time = Date.now() * 0.0011;
    var x1 = 78 + Math.cos(time) * 12;
    var y1 = 42 + Math.sin(time) * 18;
    var x2 = 22 + Math.cos(time + Math.PI) * 12;
    var y2 = 52 + Math.sin(time + Math.PI) * 18;

    placeOrbs(x1, y1, x2, y2);
    animationFrameId = window.requestAnimationFrame(animateMobileOrbit);
  }

  function syncAnimationMode() {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    if (mobileQuery.matches && !reducedMotion) {
      animateMobileOrbit();
    } else {
      resetOrbs();
    }
  }

  function bindProjectRoutes() {
    projectCards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        var projectSlug = card.getAttribute("data-project-slug");

        if (!projectSlug) {
          return;
        }

        if (!mobileQuery.matches) {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          event.preventDefault();
          openProjectRoute(projectSlug, "push");
          return;
        }

        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();

        if (navigationTimer) {
          window.clearTimeout(navigationTimer);
          navigationTimer = null;
        }

        projectCards.forEach(function (otherCard) {
          otherCard.classList.remove("is-animating");
        });

        card.classList.add("is-animating");

        navigationTimer = window.setTimeout(function () {
          openProjectRoute(projectSlug, "push");
        }, 600);
      });
    });
  }

  if (aboutMedia) {
    resetOrbs();
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetOrbs);
    syncAnimationMode();

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", syncAnimationMode);
    } else if (typeof mobileQuery.addListener === "function") {
      mobileQuery.addListener(syncAnimationMode);
    }
  }

  if (projectCards.length) {
    bindProjectRoutes();
  }

  if (projectBackLinks.length) {
    projectBackLinks.forEach(function (projectBackLink) {
      projectBackLink.addEventListener("click", function (event) {
      event.preventDefault();
      closeProjectRoute("push");
    });
    });
  }

  projectCloseTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      closeProjectRoute("push");
    });
  });

  window.addEventListener("popstate", function () {
    syncProjectRouteWithLocation(null);
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && projectRoute && !projectRoute.hidden) {
      closeProjectRoute("push");
    }
  });

  syncProjectRouteWithLocation("stack");

  if (!getProjectSlugFromPath(window.location.pathname) && window.location.hash === "#portfolio" && portfolioSection) {
    portfolioSection.scrollIntoView({ behavior: "auto", block: "start" });
  }
})();
