<script setup>
import Footer from "@/components/user/UserFooter.vue"
import HomeHero from "@/components/user/home/HomeHero.vue"
import HomeFeatures from "@/components/user/home/HomeFeatures.vue"
import HomeHowItWorks from "@/components/user/home/HomeHowItWorks.vue"
import HomeBenefits from "@/components/user/home/HomeBenefits.vue"
import HomeStats from "@/components/user/home/HomeStats.vue"
import HomeTestimonials from "@/components/user/home/HomeTestimonials.vue"
import HomeFaq from "@/components/user/home/HomeFaq.vue"
import HomeCta from "@/components/user/home/HomeCta.vue"
</script>

<template>
  <div class="w-full overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
    <HomeHero />
    <HomeFeatures />
    <HomeHowItWorks />
    <HomeBenefits />
    <HomeStats />
    <HomeTestimonials />
    <HomeFaq />
    <HomeCta />
    <Footer />
  </div>
</template>