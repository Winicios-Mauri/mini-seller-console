import { useEffect, useState, useMemo } from "react";

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

export interface LeadFilters {
  search: string;
  status: string;
  source: string;
  sortBy: 'score' | 'name' | 'company';
  sortOrder: 'asc' | 'desc';
}

export interface Opportunity {
  id: number;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
  leadId: number;
  createdAt: Date;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LeadFilters>({
    search: '',
    status: '',
    source: '',
    sortBy: 'score',
    sortOrder: 'desc'
  });

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('leadFilters');
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
      } catch (e) {
        console.warn('Failed to parse saved filters');
      }
    }
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('leadFilters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      fetch("/leads.json")
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch leads');
          return res.json();
        })
        .then((data) => {
          setLeads(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 800); // simula latência
  }, []);

  // Filter and sort leads
  const filteredLeads = useMemo(() => {
    let filtered = leads.filter(lead => {
      const matchesSearch = !filters.search || 
        lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.company.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = !filters.status || lead.status === filters.status;
      const matchesSource = !filters.source || lead.source === filters.source;
      
      return matchesSearch && matchesStatus && matchesSource;
    });

    // Sort leads
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (filters.sortBy) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        default:
          aValue = a.score;
          bValue = b.score;
      }

      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [leads, filters]);

  const updateLead = (id: number, updates: Partial<Lead>) => {
    // Optimistic update
    const originalLeads = leads;
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));

    // Simulate API call with potential failure
    setTimeout(() => {
      if (Math.random() < 0.1) { // 10% chance of failure
        // Rollback on failure
        setLeads(originalLeads);
        throw new Error('Failed to update lead');
      }
    }, 1000);
  };

  const convertToOpportunity = (lead: Lead, amount?: number): Promise<Opportunity> => {
    return new Promise((resolve, reject) => {
      // Simulate API call with potential failure
      setTimeout(() => {
        if (Math.random() < 0.1) { // 10% chance of failure
          reject(new Error('Failed to convert lead to opportunity'));
          return;
        }

        const opportunity: Opportunity = {
          id: Date.now(),
          name: lead.name,
          stage: 'Prospecting',
          amount,
          accountName: lead.company,
          leadId: lead.id,
          createdAt: new Date()
        };

        setOpportunities(prev => [opportunity, ...prev]);
        resolve(opportunity);
      }, 1000);
    });
  };

  const getUniqueStatuses = () => {
    return Array.from(new Set(leads.map(lead => lead.status))).sort();
  };

  const getUniqueSources = () => {
    return Array.from(new Set(leads.map(lead => lead.source))).sort();
  };

  return { 
    leads: filteredLeads, 
    allLeads: leads,
    opportunities,
    loading, 
    error,
    filters,
    setFilters,
    updateLead,
    convertToOpportunity,
    getUniqueStatuses,
    getUniqueSources
  };
}