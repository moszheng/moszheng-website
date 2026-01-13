<script setup>
import { ref, computed } from "vue";
import WorksData from "@/data/WorksData.json";

const projects = ref(WorksData.project);
const isDev = import.meta.env.DEV;
const statusMessage = ref("");

// Sorting State
const sortOrder = ref('default'); // 'default', 'year', 'name'

// Selection State (Object Reference)
const selectedProject = ref(projects.value[0]);

const sortedProjects = computed(() => {
    let list = [...projects.value];
    if (sortOrder.value === 'year') {
        return list.sort((a, b) => {
            const yearA = parseInt(a.date) || 0;
            const yearB = parseInt(b.date) || 0;
            return yearB - yearA; // Newest first
        });
    } else if (sortOrder.value === 'name') {
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return projects.value;
});

// Image helper for preview
const getImageUrl = (filename) => {
    if (!filename) return "";
    // Resolving logic matching Project.vue but safer for Vite
    return new URL(`/src/img/${filename}`, import.meta.url).href;
};

const saveChanges = async () => {
    statusMessage.value = "Saving...";
    try {
        const payload = { project: projects.value };
        const response = await fetch("/api/save-works", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            statusMessage.value = "Saved successfully!";
            setTimeout(() => (statusMessage.value = ""), 3000);
        } else {
            statusMessage.value = "Error saving.";
        }
    } catch (e) {
        statusMessage.value = "Network error.";
        console.error(e);
    }
};

const addProject = () => {
    projects.value.unshift({
        name: "New Project",
        en_name: "New Project EN",
        url_name: "new_project",
        date: "2024",
        img: "",
        img_md: [],
        company: "Self",
        msg: [],
        roles: [],
        credit: {},
    });
    projects.value.unshift(newProj);
    selectedProject.value = newProj; // Select new project
};

const removeProject = (project) => {
    if (confirm("Are you sure you want to delete this project?")) {
        const index = projects.value.indexOf(project);
        if (index > -1) {
            projects.value.splice(index, 1);
            selectedProject.value = projects.value[0] || null;
        }
    }
};

const updateVideoJson = (e) => {
    try {
        selectedProject.value.video = JSON.parse(e.target.value);
    } catch (err) {
        alert("Invalid JSON format for Video");
    }
};

const updateRolesJson = (e) => {
    try {
        selectedProject.value.roles = JSON.parse(e.target.value);
    } catch (err) {
        alert("Invalid JSON format for Roles");
    }
};
</script>

<template>
    <div class="admin-page min-h-screen bg-gray-100 flex flex-col">
        <!-- Header -->
        <div class="bg-white shadow p-4 flex justify-between items-center fixed w-full z-10 top-0">
            <div class="flex items-center space-x-4">
                 <h1 class="text-xl font-bold text-gray-800">Admin Editor <span class="text-xs text-blue-500 bg-blue-100 px-2 py-0.5 rounded">DEV</span></h1>
                 <span v-if="statusMessage" class="text-green-600 font-bold text-sm animate-pulse">{{ statusMessage }}</span>
            </div>
           
            <div class="space-x-2">
                <button @click="addProject" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm transition">
                    + Add New
                </button>
                <button @click="saveChanges" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-bold shadow transition">
                    Save Changes
                </button>
            </div>
        </div>

        <div v-if="!isDev" class="flex items-center justify-center h-screen text-red-500">
            <div>
                <h1 class="text-4xl font-bold">Access Denied</h1>
                <p>This page is only available in development mode.</p>
            </div>
        </div>

        <!-- Main Layout -->
        <div v-else class="flex flex-1 pt-16 h-screen overflow-hidden">
            
            <!-- Sidebar (Project List) -->
            <!-- Sidebar (Project List) -->
            <aside class="w-1/4 min-w-[250px] bg-white border-r overflow-y-auto h-full px-4">
                <div class="p-4 border-b bg-gray-50 flex flex-col space-y-2 sticky top-0 bg-white z-10">
                    <h2 class="font-bold text-gray-500 uppercase text-xs tracking-wider">Projects ({{ projects.length }})</h2>
                    <div class="flex space-x-1">
                        <button 
                            @click="sortOrder = 'default'" 
                            class="text-xs px-2 py-1 rounded border transition"
                            :class="sortOrder === 'default' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                        >Default</button>
                        <button 
                            @click="sortOrder = 'year'" 
                            class="text-xs px-2 py-1 rounded border transition"
                            :class="sortOrder === 'year' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                        >Year</button>
                        <button 
                            @click="sortOrder = 'name'" 
                            class="text-xs px-2 py-1 rounded border transition"
                            :class="sortOrder === 'name' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                        >Name</button>
                    </div>
                </div>
                <ul class="mt-2">
                    <li v-for="(item, index) in sortedProjects" :key="index">
                        <button 
                            @click="selectedProject = item"
                            class="w-full text-left p-4 border-b hover:bg-blue-50 transition border-l-4 cursor-pointer"
                            :class="selectedProject === item ? 'rounded-lg bg-main-orange border-blue-500' : 'border-transparent'"
                        >
                            <h4 class="font-bold text-gray-800 truncate">{{ item.name }}</h4>
                            <p class="text-xs text-gray-500 truncate">{{ item.en_name }}</p>
                            <span class="text-[10px] text-gray-400 font-mono">{{ item.date }}</span>
                        </button>
                    </li>
                </ul>
            </aside>

            <!-- Editor Area -->
            <main class="flex-1 overflow-y-auto bg-gray-50 p-8 pb-32" v-if="selectedProject">
                <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                    
                    <!-- Main Image Preview (Visual Focus) -->
                    <div class="relative bg-gray-200 h-64 md:h-80 w-full group">
                        <img 
                            v-if="selectedProject.img" 
                            :src="getImageUrl(selectedProject.img)" 
                            class="w-full h-full object-cover transition duration-500"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                            No Image Selected
                        </div>
                        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                             <h2 class="text-3xl font-bold text-white mb-1">{{ selectedProject.name }}</h2>
                             <p class="text-white/80">{{ selectedProject.en_name }}</p>
                        </div>
                        
                         <!-- Floating Delete Button -->
                         <button @click="removeProject(selectedProject)" class="absolute top-4 right-4 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 p-2 rounded-full shadow transition" title="Delete Project">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>

                    <!-- Form Content -->
                    <div class="p-6 md:p-8 space-y-6">
                        
                        <!-- Basic Info Group -->
                         <div class="grid gap-6">
                             <div class="space-y-1">
                                 <label class="text-xs font-bold text-gray-500 uppercase">Project Name (ZH)</label>
                                 <input v-model="selectedProject.name" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                             </div>
                             <div class="space-y-1">
                                 <label class="text-xs font-bold text-gray-500 uppercase">Project Name (EN)</label>
                                 <input v-model="selectedProject.en_name" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                             </div>
                         </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-1">
                                <label class="text-xs font-bold text-gray-500 uppercase">Date</label>
                                <input v-model="selectedProject.date" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                            </div>
                             <div class="space-y-1">
                                <label class="text-xs font-bold text-gray-500 uppercase">Company</label>
                                <input v-model="selectedProject.company" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                            </div>
                             <div class="space-y-1">
                                <label class="text-xs font-bold text-gray-500 uppercase">URL Slug</label>
                                <input v-model="selectedProject.url_name" class="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition font-mono text-sm" />
                            </div>
                            <div class="space-y-1">
                                <label class="text-xs font-bold text-gray-500 uppercase">Main Image Filename</label>
                                <input v-model="selectedProject.img" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-mono text-sm" placeholder="e.g. 01_gma29.jpg" />
                            </div>
                        </div>

                        <hr class="border-gray-100" />

                        <!-- Description -->
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <label class="text-xs font-bold text-gray-500 uppercase">Description</label>
                                <span class="text-xs text-gray-400">Separate paragraphs with double enter</span>
                            </div>
                            <textarea 
                                :value="selectedProject.msg?.join('\n\n')" 
                                @input="selectedProject.msg = $event.target.value.split('\n\n')"
                                class="w-full border border-gray-300 rounded px-3 py-2 h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            ></textarea>
                        </div>

                         <hr class="border-gray-100" />

                        <!-- Metadata -->
                        <div class="bg-gray-50 rounded p-4 space-y-4">
                            <h3 class="text-sm font-bold text-gray-600">Additional Data (Raw JSON)</h3>
                            <div class="grid grid-cols-1 gap-4">
                                 <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase">Video IDs</label>
                                    <input 
                                        :value="JSON.stringify(selectedProject.video)"
                                        @change="updateVideoJson"
                                        class="w-full border border-gray-300 rounded px-3 py-2 font-mono text-xs" 
                                    />
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-400 uppercase">Roles</label>
                                    <input 
                                        :value="JSON.stringify(selectedProject.roles)" 
                                        @change="updateRolesJson"
                                        class="w-full border border-gray-300 rounded px-3 py-2 font-mono text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
