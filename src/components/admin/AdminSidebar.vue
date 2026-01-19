<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    projects: {
        type: Array,
        required: true
    },
    selectedProject: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['select']);

const searchQuery = ref('');
const sortOrder = ref('default'); // 'default', 'year', 'name'

const filteredProjects = computed(() => {
    let list = [...props.projects];

    // Filter
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter(p =>
            p.name.toLowerCase().includes(q) ||
            (p.en_name && p.en_name.toLowerCase().includes(q))
        );
    }

    // Sort
    if (sortOrder.value === 'year') {
        list.sort((a, b) => {
            const yearA = parseInt(a.date) || 0;
            const yearB = parseInt(b.date) || 0;
            return yearB - yearA; // Newest first
        });
    } else if (sortOrder.value === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
});
</script>

<template>
    <div class="flex flex-col h-full bg-white border-r border-gray-200">
        <!-- Search & Filter Header -->
        <div class="p-4 border-b border-gray-200 space-y-3 bg-gray-50">
            <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search projects..."
                    class="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <div class="flex rounded shadow-sm">
                <button
                    @click="sortOrder = 'default'"
                    class="flex-1 text-xs py-1.5 px-2 text-center border border-r-0 rounded-l border-gray-300 transition"
                    :class="sortOrder === 'default' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'"
                >Default</button>
                <button
                    @click="sortOrder = 'year'"
                    class="flex-1 text-xs py-1.5 px-2 text-center border border-r-0 border-gray-300 transition"
                    :class="sortOrder === 'year' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'"
                >Year</button>
                <button
                    @click="sortOrder = 'name'"
                    class="flex-1 text-xs py-1.5 px-2 text-center border border-gray-300 rounded-r transition"
                    :class="sortOrder === 'name' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'"
                >Name</button>
            </div>
        </div>

        <!-- List -->
        <div class="flex-1 overflow-y-auto">
            <div class="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {{ filteredProjects.length }} Projects
            </div>
            <ul>
                <li v-for="(item, index) in filteredProjects" :key="index">
                    <button
                        @click="emit('select', item)"
                        class="w-full text-left p-3 border-b border-gray-100 hover:bg-gray-50 transition border-l-4"
                        :class="selectedProject === item ? 'bg-blue-50 border-l-blue-500' : 'border-l-transparent'"
                    >
                        <div class="flex justify-between items-start mb-1">
                            <h4 class="font-semibold text-gray-800 text-sm truncate pr-2">{{ item.name }}</h4>
                            <span class="text-[10px] text-gray-400 font-mono shrink-0 py-0.5">{{ item.date }}</span>
                        </div>
                        <p class="text-xs text-gray-500 truncate">{{ item.en_name || 'No English Name' }}</p>
                    </button>
                </li>
            </ul>

            <div v-if="filteredProjects.length === 0" class="p-8 text-center text-gray-400 text-sm">
                No projects found.
            </div>
        </div>
    </div>
</template>
