"""Build the English collaboration brief as PDF and standalone HTML."""
from pathlib import Path
import html
import math

from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, Table, TableStyle
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
PDF = ROOT / 'output/pdf/core-initiative-tolga-guide.pdf'
HTML = ROOT / 'output/html/core-initiative-tolga-guide.html'
FONTS = Path('/Users/ydogan/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype')
for name, file in [('Guide', 'NotoSans-Regular.ttf'), ('GuideBold', 'NotoSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))
pdfmetrics.registerFontFamily('Guide', normal='Guide', bold='GuideBold', italic='Guide', boldItalic='GuideBold')

from tolga_guide_content import ARCH, BRANDS, DATE, PAGES, SUBTITLE

INK = HexColor('#203b33')
MUTED = HexColor('#59695f')
PAPER = HexColor('#faf8f2')
LINE = HexColor('#dce1d8')
W, H = 595.276, 841.89
M, CW = 43, W - 86
STYLES = {
    'p': ParagraphStyle('p', fontName='Guide', fontSize=9.5, leading=14.4, textColor=INK),
    'lead': ParagraphStyle('lead', fontName='Guide', fontSize=11.2, leading=16.4, textColor=INK),
    'h': ParagraphStyle('h', fontName='GuideBold', fontSize=11.5, leading=16, textColor=INK),
    'small': ParagraphStyle('small', fontName='Guide', fontSize=8.3, leading=12.3, textColor=MUTED),
    'cell': ParagraphStyle('cell', fontName='Guide', fontSize=8.7, leading=12.4, textColor=INK),
    'th': ParagraphStyle('th', fontName='GuideBold', fontSize=8.4, leading=12, textColor=INK),
}

def para(c, text, y, kind='p', width=CW, x=M):
    p = Paragraph(text, STYLES[kind])
    _, ph = p.wrap(width, H)
    p.drawOn(c, x, y - ph)
    return y - ph

def table(c, heads, rows, y, widths):
    data = [[Paragraph(h, STYLES['th']) for h in heads]]
    data += [[Paragraph(str(t), STYLES['cell']) for t in row] for row in rows]
    t = Table(data, colWidths=widths, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,0), HexColor('#e8ede5')),
        ('LINEBELOW', (0,0), (-1,0), 0.5, LINE),
        ('LINEBELOW', (0,1), (-1,-1), 0.35, LINE),
        ('LEFTPADDING', (0,0), (-1,-1), 9),
        ('RIGHTPADDING', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
    ]))
    _, th = t.wrap(CW, H)
    t.drawOn(c, M, y-th)
    return y-th

def diagram(c, y):
    height = 148
    cx, cy = W / 2, y - height/2
    coords = []
    for i in range(6):
        a = math.radians(90-i*60)
        coords.append((cx + 123*math.cos(a), cy + 52*math.sin(a)))
    for (name, _, _, color), (x, yy) in zip(BRANDS[1:], coords):
        c.setStrokeColor(LINE)
        c.line(cx, cy, x, yy)
        c.setFillColor(PAPER)
        c.setStrokeColor(HexColor(color))
        c.roundRect(x-46, yy-12, 92, 24, 12, fill=1, stroke=1)
        c.setFillColor(HexColor(color))
        c.setFont('GuideBold', 9)
        c.drawCentredString(x, yy-3.2, name)
    c.setFillColor(INK)
    c.roundRect(cx-55, cy-18, 110, 36, 18, fill=1, stroke=0)
    c.setFillColor(PAPER)
    c.setFont('GuideBold', 8.7)
    c.drawCentredString(cx, cy-3, 'Core Initiative')
    return y-height

def architecture_pdf(c, y):
    """Draw shared diagram geometry with explicit API and storage boundaries."""
    scale = CW / ARCH['width']
    def xy(x, yy):
        return M+x*scale, y-yy*scale
    c.setStrokeColor(HexColor('#8c9f92'))
    c.setLineWidth(0.8)
    for points, label in ARCH['edges']:
        for a,b in zip(points, points[1:]):
            c.line(*xy(*a),*xy(*b))
        (x0,y0),(x1,y1) = points[-2:]
        dx,dy=x1-x0,y1-y0
        length=math.hypot(dx,dy)
        ux,uy=dx/length,dy/length
        for side in [-1,1]:
            c.line(*xy(x1,y1),*xy(x1-5*ux+side*3*uy,y1-5*uy-side*3*ux))
        if label:
            c.setFillColor(MUTED)
            c.setFont('Guide',7)
            lx,ly=xy(x1+7,(y0+y1)/2)
            c.drawString(lx,ly-2,label)
    for _,x,yy,w,h,title,sub,dark in ARCH['nodes']:
        left,top=xy(x,yy)
        c.setFillColor(INK if dark else HexColor('#e9eee5'))
        c.roundRect(left,top-h*scale,w*scale,h*scale,5,fill=1,stroke=0)
        c.setFillColor(PAPER if dark else INK)
        c.setFont('GuideBold',9)
        c.drawCentredString(left+w*scale/2,top-17*scale,title)
        c.setFillColor(HexColor('#dce6df') if dark else MUTED)
        c.setFont('Guide',6.9)
        c.drawCentredString(left+w*scale/2,top-31*scale,sub)
    return y-ARCH['height']*scale-10

def architecture_svg():
    svg = ['<svg class="architecture" viewBox="0 0 510 246" role="img" aria-label="Seven Next.js sites create records through a shared ASP.NET Core API. The authenticated team dashboard uses the same API; notifications follow persistence.">',
           '<defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="none" stroke="#8c9f92"/></marker></defs>']
    for points,label in ARCH['edges']:
        ps=' '.join(f'{x},{y}' for x,y in points)
        svg.append(f'<polyline points="{ps}" fill="none" stroke="#8c9f92" marker-end="url(#arrow)"/>')
        if label:
            x1,y1=points[-1]
            y0=points[-2][1]
            svg.append(f'<text x="{x1+7}" y="{(y0+y1)/2+2}" class="edge-label">{html.escape(label)}</text>')
    for _,x,y,w,h,title,sub,dark in ARCH['nodes']:
        svg += [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="{"#203b33" if dark else "#e9eee5"}"/>',
                f'<text x="{x+w/2}" y="{y+17}" text-anchor="middle" class="node-title" fill="{"#faf8f2" if dark else "#203b33"}">{html.escape(title)}</text>',
                f'<text x="{x+w/2}" y="{y+31}" text-anchor="middle" class="node-sub" fill="{"#dce6df" if dark else "#59695f"}">{html.escape(sub)}</text>']
    svg.append('</svg>')
    return ''.join(svg)

def build_pdf():
    PDF.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(PDF), pagesize=(W,H))
    c.setTitle(f'Core Initiative - {SUBTITLE}')
    c.setAuthor('Core Initiative')
    for n, page in enumerate(PAGES, 1):
        c.setFillColor(PAPER)
        c.rect(0, 0, W, H, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont('GuideBold', 9)
        c.drawString(M, H-35, 'CORE INITIATIVE')
        c.setFillColor(MUTED)
        c.setFont('Guide', 8)
        c.drawRightString(W-M, H-35, f'{SUBTITLE} / {DATE}')
        c.setStrokeColor(LINE)
        c.line(M,H-46,W-M,H-46)
        c.setFillColor(MUTED)
        c.setFont('GuideBold', 8.1)
        c.drawString(M,H-69,page['kicker'])
        c.setFillColor(INK)
        c.setFont('GuideBold', 23)
        c.drawString(M,H-102,page['title'])
        y = H-122
        for kind, content in page['blocks']:
            if kind in ('p','lead','h'):
                if kind == 'h': y -= 5
                y = para(c, content, y, kind) - (8 if kind!='h' else 5)
            elif kind in ('ul', 'ol'):
                for index, item in enumerate(content, 1):
                    c.setFillColor(INK)
                    if kind == 'ol':
                        c.setFont('GuideBold', 9.5)
                        c.drawString(M+1, y-10, f'{index}.')
                    else:
                        c.circle(M+4, y-6.5, 1.6, fill=1, stroke=0)
                    y = para(c, item, y, width=CW-18, x=M+18)-5
                y -= 3
            elif kind == 'diagram':
                y = diagram(c, y) - 4
            elif kind == 'architecture':
                y = architecture_pdf(c,y)
            elif kind == 'brands':
                rows = [[f'<b>{name}</b><br/><font size="7.6">{domain}</font>', role] for name,domain,role,_ in BRANDS]
                y = table(c, ['Brand and address', 'Focus'], rows, y, [216,CW-216]) - 12
            elif kind == 'table':
                y = table(c, *content, y, [137,CW-137]) - 10
            elif kind == 'note':
                p = Paragraph(content, STYLES['small'])
                _, ph = p.wrap(CW-22,H)
                c.setFillColor(HexColor('#e9eee5'))
                c.roundRect(M,y-ph-19,CW,ph+19,5,fill=1,stroke=0)
                p.drawOn(c,M+11,y-ph-9)
                y -= ph+29
            elif kind == 'flow':
                box_w = (CW-44)/3
                box_h = 43
                for i, label in enumerate(content):
                    x = M+i*(box_w+22)
                    c.setFillColor(HexColor('#e9eee5'))
                    c.roundRect(x,y-box_h,box_w,box_h,5,fill=1,stroke=0)
                    style = ParagraphStyle('flow',parent=STYLES['th'],alignment=1)
                    p = Paragraph(label,style)
                    _,ph = p.wrap(box_w-16,box_h)
                    p.drawOn(c,x+8,y-(box_h+ph)/2)
                    if i<2:
                        ax=x+box_w+4
                        ay=y-box_h/2
                        c.setStrokeColor(INK)
                        c.setLineWidth(0.7)
                        c.line(ax,ay,ax+14,ay)
                        c.line(ax+10,ay+3,ax+14,ay)
                        c.line(ax+10,ay-3,ax+14,ay)
                y -= box_h+16
            elif kind == 'references':
                for label,url in content:
                    y = para(c,f'<link href="{html.escape(url,quote=True)}" color="#355c50">{html.escape(label)}</link>',y,'small')-3
        if y < 56:
            raise ValueError(f'Page {n} overflows: {y:.1f}')
        c.setStrokeColor(LINE)
        c.line(M,43,W-M,43)
        c.setFillColor(MUTED)
        c.setFont('Guide', 7.5)
        c.drawString(M,29,'Core Initiative / Decisions and architecture draft')
        c.drawRightString(W-M,29,f'{n} / {len(PAGES)}')
        c.showPage()
        print(f'page {n}: content ends at {y:.1f}pt')
    c.save()
    reader = PdfReader(str(PDF))
    assert len(reader.pages) == len(PAGES)
    text = '\n'.join(p.extract_text() for p in reader.pages)
    for expected in ['Construct','Cookie','Tool','Agent','Reflection','Spoon','Reply-To','Dutch','Tolga','ASP.NET Core','Supabase','Phone','PostgreSQL']:
        assert expected in text, expected
    for removed in ['Contribute wherever you like','Getting started with a brand','First step: choose a brand']:
        assert removed not in text, removed
    print(f'PDF OK: {PDF} ({len(text)} characters)')

def html_table(heads, rows):
    return '<div class="table-wrap"><table><thead><tr>'+''.join(f'<th>{x}</th>' for x in heads)+'</tr></thead><tbody>'+''.join('<tr>'+''.join(f'<td>{x}</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table></div>'

def build_html():
    sections = []
    for n,page in enumerate(PAGES,1):
        parts = [f'<section id="section-{n}"><p class="kicker">{page["kicker"]}</p><h1>{page["title"]}</h1>']
        for kind, content in page['blocks']:
            if kind in ('p','lead'):
                parts.append(f'<p class="{kind}">{content}</p>')
            elif kind in ('ul', 'ol'):
                parts.append(f'<{kind}>'+''.join(f'<li>{item}</li>' for item in content)+f'</{kind}>')
            elif kind == 'h': parts.append(f'<h2>{content}</h2>')
            elif kind == 'note': parts.append(f'<aside>{content}</aside>')
            elif kind == 'brands':
                parts.append(html_table(['Marka ve adres','Odak'],[[f'<strong style="color:{color}">{name}</strong><small>{domain}</small>',role] for name,domain,role,color in BRANDS]))
            elif kind == 'table': parts.append(html_table(*content))
            elif kind == 'architecture': parts.append('<div class="diagram-scroll">'+architecture_svg()+'</div>')
            elif kind == 'flow': parts.append('<div class="flow">'+ '<span aria-hidden="true">→</span>'.join(f'<b>{html.escape(s)}</b>' for s in content)+'</div>')
            elif kind == 'diagram':
                coords = [(300+175*math.cos(math.radians(90-i*60)),110+75*math.sin(math.radians(90-i*60))) for i in range(6)]
                svg = ['<svg class="map" viewBox="0 0 600 220" role="img" aria-label="Core Initiative at the center, surrounded by six specialist brands">']
                for (name,_,_,color),(x,y) in zip(BRANDS[1:],coords):
                    svg += [f'<path d="M300 110 L{x} {y}" stroke="#dce1d8"/>',f'<rect x="{x-64}" y="{y-17}" width="128" height="34" rx="17" fill="#faf8f2" stroke="{color}"/>',f'<text x="{x}" y="{y+5}" text-anchor="middle" fill="{color}">{name}</text>']
                svg += ['<rect x="224" y="88" width="152" height="44" rx="22" fill="#203b33"/><text x="300" y="115" text-anchor="middle" fill="#faf8f2">Core Initiative</text></svg>']
                parts.append(''.join(svg))
            elif kind == 'references':
                parts.append('<div class="sources">'+''.join(f'<a href="{html.escape(url,quote=True)}">{html.escape(label)}</a>' for label,url in content)+'</div>')
        parts.append('</section>')
        sections.append(''.join(parts))
    CSS = '''
    :root{--ink:#203b33;--muted:#59695f;--line:#dce1d8;--paper:#faf8f2}*{box-sizing:border-box}
    html{scroll-behavior:smooth}body{margin:0;background:#e9eae3;color:var(--ink);font:16px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif}
    header{max-width:940px;margin:44px auto 22px;padding:0 28px;display:flex;justify-content:space-between;align-items:center;gap:16px}header strong{letter-spacing:.12em;font-size:13px}header span{font-size:13px;color:var(--muted)}
    main{max-width:940px;margin:0 auto 60px}section{background:var(--paper);padding:46px 54px;margin:0 20px 24px;border-radius:12px;box-shadow:0 6px 28px #203b3307}
    .kicker{font-size:11px;letter-spacing:.12em;color:var(--muted);font-weight:750;margin:0 0 15px}h1{font-size:32px;line-height:1.18;letter-spacing:-.035em;margin:0 0 24px}h2{font-size:19px;line-height:1.4;margin:27px 0 10px}.lead{font-size:18px;line-height:1.6}p{margin:0 0 16px}a{color:#355c50;text-underline-offset:3px}
    ul,ol{margin:0 0 16px;padding-left:24px}li{padding-left:3px;margin-bottom:8px}li::marker{color:var(--ink);font-weight:700}
    .architecture{display:block;width:100%;margin:14px auto 20px}.node-title{font:700 10px system-ui,sans-serif}.node-sub{font:8px system-ui,sans-serif}.edge-label{font:7.5px system-ui,sans-serif;fill:#59695f}.diagram-scroll{overflow-x:auto}.sources a{display:block;margin-top:3px}
    .map{display:block;width:100%;max-height:245px;margin:8px auto 16px}.map text{font:600 14px system-ui,sans-serif}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:14px;margin:0 0 22px}th{text-align:left;background:#e8ede5;font-size:12px}th,td{padding:12px 13px;border-bottom:1px solid var(--line);vertical-align:top}td:first-child{width:35%}small{display:block;color:var(--muted);font-size:11px;margin-top:3px}aside{background:#e9eee5;padding:17px 20px;border-radius:7px;font-size:14px;margin:18px 0 0}.flow{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:17px 0;font-size:14px}.flow b{background:#e9eee5;border-radius:6px;padding:8px 12px}.sources{font-size:12px;color:var(--muted);margin:18px 0 0}footer{max-width:900px;margin:0 auto 32px;padding:0 28px;color:var(--muted);font-size:12px}
    @media(max-width:640px){header{margin-top:24px;align-items:flex-start;flex-direction:column}section{padding:28px 22px;margin:0 12px 16px}h1{font-size:27px}.lead{font-size:17px}th,td{padding:10px 8px}td:first-child{width:39%}small{overflow-wrap:anywhere}.map{min-height:170px}.flow{gap:8px}.architecture{min-width:510px}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
    @media print{body{background:white;font-size:10pt}header{margin:0 auto 12px}main{margin:0;max-width:none}section{margin:0;padding:18px 0;box-shadow:none;border-radius:0;break-after:page}section:last-child{break-after:auto}h1{font-size:25pt}h2{font-size:13pt}.lead{font-size:12pt}table{font-size:9pt}aside{font-size:9pt}th,td{padding:8px}footer{display:none}a{color:inherit}.map{max-height:160px}}
    '''
    document = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Core Initiative - {SUBTITLE}</title><style>{CSS}</style></head><body><header><strong>CORE INITIATIVE</strong><span>{SUBTITLE} · {DATE}</span></header><main>{"".join(sections)}</main><footer>Core Initiative / Decisions and architecture draft</footer></body></html>'
    HTML.parent.mkdir(parents=True, exist_ok=True)
    HTML.write_text(document,encoding='utf-8')
    print(f'HTML OK: {HTML}')

if __name__ == '__main__':
    build_pdf()
    build_html()
