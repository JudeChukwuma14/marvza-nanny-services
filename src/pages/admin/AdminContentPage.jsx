import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import {
  fetchAllFaqs, createFaq, updateFaq, deleteFaq,
  fetchAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
} from '../../api/content'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import Badge from '../../components/ui/Badge'
import { Plus, X, Pencil, Trash2 } from 'lucide-react'

const FAQ_CATEGORIES = [
  { key: 'homepage', label: 'Homepage Preview' },
  { key: 'general', label: 'General' },
  { key: 'families', label: 'For Families' },
  { key: 'nannies', label: 'For Nannies' },
]

const inputClass = 'w-full px-3 py-2 text-sm rounded-lg border border-[#E4D8C7] focus:outline-none focus:ring-2 focus:ring-[#3B2923]/20'
const labelClass = 'text-xs font-medium text-[#7C6659] mb-1 block'
const primaryBtn = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3B2923] text-white text-sm font-medium hover:bg-[#2A1B17] transition-colors disabled:opacity-50'
const ghostBtn = 'px-3 py-1.5 rounded-lg border border-[#E4D8C7] text-xs font-medium text-[#3B2923] hover:bg-[#F8F3EA] transition-colors disabled:opacity-40'

/* ── FAQs ──────────────────────────────────────────────────── */

function FaqForm({ initial, onCancel, onSubmit, submitting, error }) {
  const [question, setQuestion] = useState(initial?.question || '')
  const [answer, setAnswer] = useState(initial?.answer || '')
  const [category, setCategory] = useState(initial?.category || 'general')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ question, answer, category })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#F8F3EA] rounded-lg border border-[#E4D8C7] p-4 mb-3">
      {error && <p className="text-sm text-[#B94A48] mb-3">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 mb-3">
        <div>
          <label className={labelClass}>Question</label>
          <input required value={question} onChange={(e) => setQuestion(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} bg-white`}>
            {FAQ_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label className={labelClass}>Answer</label>
        <textarea required rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} className={inputClass} />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className={primaryBtn}>{submitting ? 'Saving…' : 'Save'}</button>
        <button type="button" onClick={onCancel} className={ghostBtn}>Cancel</button>
      </div>
    </form>
  )
}

function FaqSection({ faqs, onCreated, onUpdated, onDeleted }) {
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(data) {
    setSubmitting(true)
    setError('')
    try {
      const faq = await createFaq(data)
      onCreated(faq)
      setShowAdd(false)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create FAQ')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdate(id, data) {
    setSubmitting(true)
    setError('')
    try {
      const faq = await updateFaq(id, data)
      onUpdated(faq)
      setEditingId(null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update FAQ')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleTogglePublish(faq) {
    try {
      const updated = await updateFaq(faq._id, { isPublished: !faq.isPublished })
      onUpdated(updated)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this FAQ?')) return
    try {
      await deleteFaq(id)
      onDeleted(id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg font-semibold text-[#3B2923]">FAQs</h2>
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} className={primaryBtn}>
            <Plus size={16} /> Add FAQ
          </button>
        )}
      </div>

      {showAdd && (
        <FaqForm
          submitting={submitting}
          error={error}
          onCancel={() => { setShowAdd(false); setError('') }}
          onSubmit={handleCreate}
        />
      )}

      {FAQ_CATEGORIES.map((cat) => {
        const items = faqs.filter((f) => f.category === cat.key)
        if (items.length === 0) return null
        return (
          <div key={cat.key} className="mb-6 last:mb-0">
            <h3 className="text-xs font-semibold text-[#7C6659] uppercase tracking-wider mb-2">{cat.label}</h3>
            <div className="divide-y divide-[#E4D8C7] border border-[#E4D8C7] rounded-lg overflow-hidden">
              {items.map((faq) =>
                editingId === faq._id ? (
                  <div key={faq._id} className="p-3">
                    <FaqForm
                      initial={faq}
                      submitting={submitting}
                      error={error}
                      onCancel={() => { setEditingId(null); setError('') }}
                      onSubmit={(data) => handleUpdate(faq._id, data)}
                    />
                  </div>
                ) : (
                  <div key={faq._id} className="p-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#3B2923]">{faq.question}</p>
                      <p className="text-sm text-[#7C6659] mt-1 line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge label={faq.isPublished ? 'Published' : 'Unpublished'} variant={faq.isPublished ? 'success' : 'archived'} />
                      <button onClick={() => handleTogglePublish(faq)} className={ghostBtn}>
                        {faq.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => setEditingId(faq._id)} className="p-2 rounded-lg border border-[#E4D8C7] text-[#3B2923] hover:bg-[#F8F3EA]">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(faq._id)} className="p-2 rounded-lg border border-[#E4D8C7] text-[#B94A48] hover:bg-[#FAEAEA]">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )
      })}

      {faqs.length === 0 && !showAdd && (
        <EmptyState title="No FAQs yet" message="Add one to get started." />
      )}
    </section>
  )
}

/* ── Testimonials ──────────────────────────────────────────── */

function TestimonialForm({ initial, onCancel, onSubmit, submitting, error }) {
  const [quote, setQuote] = useState(initial?.quote || '')
  const [name, setName] = useState(initial?.name || '')
  const [location, setLocation] = useState(initial?.location || '')
  const [service, setService] = useState(initial?.service || '')
  const [rating, setRating] = useState(initial?.rating || 5)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ quote, name, location, service, rating: Number(rating) })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#F8F3EA] rounded-lg border border-[#E4D8C7] p-4 mb-3">
      {error && <p className="text-sm text-[#B94A48] mb-3">{error}</p>}
      <div className="mb-3">
        <label className={labelClass}>Quote</label>
        <textarea required rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
        <div>
          <label className={labelClass}>Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Service</label>
          <input value={service} onChange={(e) => setService(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Rating</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)} className={`${inputClass} bg-white`}>
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className={primaryBtn}>{submitting ? 'Saving…' : 'Save'}</button>
        <button type="button" onClick={onCancel} className={ghostBtn}>Cancel</button>
      </div>
    </form>
  )
}

function TestimonialSection({ testimonials, onCreated, onUpdated, onDeleted }) {
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(data) {
    setSubmitting(true)
    setError('')
    try {
      const t = await createTestimonial(data)
      onCreated(t)
      setShowAdd(false)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create testimonial')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdate(id, data) {
    setSubmitting(true)
    setError('')
    try {
      const t = await updateTestimonial(id, data)
      onUpdated(t)
      setEditingId(null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update testimonial')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleTogglePublish(t) {
    try {
      const updated = await updateTestimonial(t._id, { isPublished: !t.isPublished })
      onUpdated(updated)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this testimonial?')) return
    try {
      await deleteTestimonial(id)
      onDeleted(id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="bg-white rounded-xl border border-[#E4D8C7] shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg font-semibold text-[#3B2923]">Testimonials</h2>
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} className={primaryBtn}>
            <Plus size={16} /> Add Testimonial
          </button>
        )}
      </div>

      {showAdd && (
        <TestimonialForm
          submitting={submitting}
          error={error}
          onCancel={() => { setShowAdd(false); setError('') }}
          onSubmit={handleCreate}
        />
      )}

      <div className="divide-y divide-[#E4D8C7] border border-[#E4D8C7] rounded-lg overflow-hidden">
        {testimonials.map((t) =>
          editingId === t._id ? (
            <div key={t._id} className="p-3">
              <TestimonialForm
                initial={t}
                submitting={submitting}
                error={error}
                onCancel={() => { setEditingId(null); setError('') }}
                onSubmit={(data) => handleUpdate(t._id, data)}
              />
            </div>
          ) : (
            <div key={t._id} className="p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-[#3B2923] italic line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs text-[#7C6659] mt-1">{t.name} · {t.location} · {t.service} · {t.rating}★</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge label={t.isPublished ? 'Published' : 'Unpublished'} variant={t.isPublished ? 'success' : 'archived'} />
                <button onClick={() => handleTogglePublish(t)} className={ghostBtn}>
                  {t.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => setEditingId(t._id)} className="p-2 rounded-lg border border-[#E4D8C7] text-[#3B2923] hover:bg-[#F8F3EA]">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(t._id)} className="p-2 rounded-lg border border-[#E4D8C7] text-[#B94A48] hover:bg-[#FAEAEA]">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {testimonials.length === 0 && !showAdd && (
        <EmptyState title="No testimonials yet" message="Add one to get started." />
      )}
    </section>
  )
}

/* ── Page ──────────────────────────────────────────────────── */

export default function AdminContentPage() {
  const [faqs, setFaqs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [faqList, testimonialList] = await Promise.all([fetchAllFaqs(), fetchAllTestimonials()])
      setFaqs(faqList)
      setTestimonials(testimonialList)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load content')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  if (loading) {
    return (
      <AdminLayout title="Content / CMS">
        <div className="bg-white rounded-xl border border-[#E4D8C7] p-12 shadow-sm flex justify-center">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Content / CMS">
      <p className="text-sm text-[#7C6659] mb-6">
        Edit the FAQs and testimonials shown on the public site. Unpublished items are hidden from visitors but kept here for later use.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-[#FAEAEA] border border-[#B94A48]/30 text-sm text-[#B94A48]">{error}</div>
      )}

      <div className="space-y-6">
        <TestimonialSection
          testimonials={testimonials}
          onCreated={(t) => setTestimonials((prev) => [t, ...prev])}
          onUpdated={(t) => setTestimonials((prev) => prev.map((x) => (x._id === t._id ? t : x)))}
          onDeleted={(id) => setTestimonials((prev) => prev.filter((x) => x._id !== id))}
        />
        <FaqSection
          faqs={faqs}
          onCreated={(f) => setFaqs((prev) => [f, ...prev])}
          onUpdated={(f) => setFaqs((prev) => prev.map((x) => (x._id === f._id ? f : x)))}
          onDeleted={(id) => setFaqs((prev) => prev.filter((x) => x._id !== id))}
        />
      </div>
    </AdminLayout>
  )
}
